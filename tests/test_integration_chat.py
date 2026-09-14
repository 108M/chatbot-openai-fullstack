import jwt
from types import SimpleNamespace
from fastapi.testclient import TestClient
import sys
from pathlib import Path


def test_websocket_chat_integration():
    # Ensure backend package modules (config, database, routes) import correctly
    repo_root = Path(__file__).resolve().parents[1]
    backend_path = str(repo_root / "backend")
    if backend_path not in sys.path:
        sys.path.insert(0, backend_path)

    # Provide a minimal fake `config` module so backend imports don't hit network
    import types
    import logging
    if "config" not in sys.modules:
        cfg = types.ModuleType("config")
        cfg.supabase = None
        cfg.openai_client = None
        cfg.elevenlabs_client = None
        cfg.logger = logging.getLogger("test_logger")
        sys.modules["config"] = cfg

    # Provide a minimal fake `elevenlabs` module (VoiceSettings used in routes)
    if "elevenlabs" not in sys.modules:
        eleven_mod = types.ModuleType("elevenlabs")
        class VoiceSettings:
            def __init__(self, *args, **kwargs):
                pass
        eleven_mod.VoiceSettings = VoiceSettings
        sys.modules["elevenlabs"] = eleven_mod

    # Provide a minimal fake `scipy.spatial.distance.cosine` to avoid heavy dependency
    if "scipy" not in sys.modules:
        scipy_mod = types.ModuleType("scipy")
        spatial_mod = types.ModuleType("scipy.spatial")
        distance_mod = types.ModuleType("scipy.spatial.distance")
        distance_mod.cosine = lambda a, b: 0.0
        spatial_mod.distance = distance_mod
        scipy_mod.spatial = spatial_mod
        sys.modules["scipy"] = scipy_mod
        sys.modules["scipy.spatial"] = spatial_mod
        sys.modules["scipy.spatial.distance"] = distance_mod

    # Import module under test and mount its websocket handler on a lightweight app
    import routes.chat as chat_mod
    from fastapi import FastAPI
    app = FastAPI()
    app.websocket("/ws/chat")(chat_mod.websocket_chat)

    # Replace external clients and DB helpers with fakes to avoid network calls
    # No Supabase usage during this test
    chat_mod.supabase = None

    # Track saved messages
    saved = []

    def fake_save_message(session_id, user_id, role, content):
        saved.append({"session_id": session_id, "user_id": user_id, "role": role, "content": content})

    chat_mod.save_message = fake_save_message

    # Simple session / history helpers
    chat_mod.get_or_create_session = lambda user_id, session_id=None: "sess-test"
    chat_mod.get_session_messages = lambda session_id, user_id: []
    chat_mod.update_session_title = lambda session_id, title: None

    # Fake OpenAI streaming response: yields two chunks
    def fake_create(model, messages, stream=True):
        def gen():
            yield SimpleNamespace(choices=[SimpleNamespace(delta=SimpleNamespace(content="Hola desde OpenAI "))])
            yield SimpleNamespace(choices=[SimpleNamespace(delta=SimpleNamespace(content="y continuación."))])
        return gen()

    fake_openai = SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(create=fake_create)))
    chat_mod.openai_client = fake_openai

    # Prepare JWT token (server decodes without verifying signature)
    token = jwt.encode({"sub": "test-user"}, "secret", algorithm="HS256")

    client = TestClient(app)

    with client.websocket_connect("/ws/chat") as websocket:
        websocket.send_json({"message": "Prueba de integración", "session_id": None, "token": token, "enable_voice": False})

        received = []
        # Read messages until we get a 'done' or 'error' type
        while True:
            msg = websocket.receive_json()
            received.append(msg)
            if msg.get("type") in ("done", "error"):
                break

    # Assertions: we received token stream chunks and a done event
    assert any(m.get("type") == "token" for m in received), "No token chunks received from OpenAI stream"
    assert any(m.get("type") == "done" for m in received), "No done message received"

    # Verify messages were saved to the DB (user + assistant)
    roles = [r["role"] for r in saved]
    assert "user" in roles and "assistant" in roles, f"Expected saved roles user and assistant, got {roles}"

    # Verify assistant content includes the merged OpenAI chunks
    assistant_msgs = [r for r in saved if r["role"] == "assistant"]
    assert assistant_msgs, "No assistant message saved"
    assistant_content = assistant_msgs[0]["content"]
    assert "Hola desde OpenAI" in assistant_content
    assert "continuación" in assistant_content
