# Agente Conversacional de ElevenLabs

## Arquitectura

El agente conversacional de ElevenLabs funciona de forma **autónoma** en la plataforma de ElevenLabs. El backend no genera las respuestas de la IA; solo recibe eventos mediante **webhooks** para:

- Registrar/auditar conversaciones en la base de datos.
- Ejecutar acciones secundarias basadas en la entrada del usuario.
- Añadir contexto personalizado al agente.

## Webhook Endpoint

`POST /webhook/elevenlabs`

### Flujo de Eventos

1. El usuario habla con el agente en ElevenLabs.
2. ElevenLabs procesa la conversación y responde (sin intervención del backend).
3. ElevenLabs envía eventos al webhook del backend.
4. El backend registra los mensajes en la base de datos.

### Tipos de Eventos Soportados

| Evento | Descripción |
|--------|-------------|
| `user_message` | Mensaje del usuario. Se guarda en la base de datos. |
| `agent_response` | Respuesta del agente. Se guarda en la base de datos. |
| `agent_started` | El agente inició una sesión. |
| `session_ended` | La sesión terminó. |

### Verificación de Firma (HMAC)

El webhook valida la firma usando `HMAC-SHA256` si está configurado `ELEVENLABS_WEBHOOK_SECRET`:

```python
webhook_secret = os.getenv("ELEVENLABS_WEBHOOK_SECRET")
if webhook_secret:
    sig_header = x_eleven_labs_signature
    if sig_header.startswith("sha256="):
        sig_header = sig_header.split("=", 1)[1]
    
    computed = hmac.new(webhook_secret.encode(), body_bytes, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(computed, sig_header):
        raise HTTPException(status_code=403, detail="Invalid webhook signature")
```

### Validación de Agent ID

Si `ELEVENLABS_AGENT_ID` está configurado, se valida que coincida con el `agent_id` del evento:

```python
if EXPECTED_AGENT_ID and agent_id != EXPECTED_AGENT_ID:
    raise HTTPException(status_code=403, detail="Agent ID mismatch")
```

## Guardado de Mensajes

### Mensaje del Usuario

```python
async def _log_user_message(body, session_id, agent_id):
    user_message = data.get("message", "")
    user_id = body.get("user_id", "agent_user")
    language = data.get("language", "es")
    
    db_session_id = get_or_create_session(user_id, session_id)
    save_message(db_session_id, user_id, "user", user_message)
```

### Respuesta del Agente

```python
async def _log_agent_response(body, session_id, agent_id):
    agent_message = data.get("message", "")
    user_id = body.get("user_id", "agent_user")
    
    db_session_id = get_or_create_session(user_id, session_id)
    save_message(db_session_id, user_id, "assistant", agent_message)
```

## Acciones Secundarias

La función `_handle_user_actions()` permite ejecutar lógica personalizada basada en palabras clave:

```python
keywords = {
    "ayuda": "send_help_email",
    "reportar": "create_support_ticket",
    "datos": "fetch_user_data"
}
```

Estas acciones son **opcionales** y deben implementarse según las necesidades del negocio.

## Endpoints Auxiliares

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/agent/create` | `POST` | Devuelve instrucciones para crear el agente en ElevenLabs. |
| `/agent/status` | `GET` | Health check del backend para webhooks. |
| `/agent/test-webhook` | `POST` | Simula eventos de ElevenLabs para pruebas. |

### Health Check

```bash
curl https://<tu-url>/agent/status
```

Response:
```json
{
  "status": "healthy",
  "webhook_endpoint": "/webhook/elevenlabs",
  "agent_id": "agent_1101khqxwk...",
  "agent_configured": true,
  "elevenlabs_configured": true,
  "supabase_configured": true
}
```

## Configuración en ElevenLabs Dashboard

1. Ve a https://elevenlabs.io/app/agents
2. Crea o selecciona tu agente.
3. Ve a **Settings → Webhooks**.
4. Configura:
   - **Webhook URL**: `https://<tu-url>/webhook/elevenlabs`
   - **Eventos**: `user_message`, `agent_response`, `session_ended`
5. Guarda los cambios.

## Setup del Frontend

El frontend carga el SDK de ElevenLabs ConvAI:

```tsx
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@elevenlabs/convai@latest/dist/index.min.js';
script.onload = () => {
  const client = new window.ElevenLabs.ConvaiClient({
    publicKey: apiKey,
    agentId: agentId,
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error)
  });
  client.startSession();
};
document.head.appendChild(script);
```
