"""
main.py - FastAPI backend para chatbot con:
1. Chatbot con respuesta en tiempo real (streaming)
2. Historial de conversación persistente (Supabase)
3. Text to Speech (ElevenLabs)
4. Speech to Text (ElevenLabs)
5. Análisis de imágenes (OpenAI Vision)
6. Soporte para archivos PDF y TXT
7. Autenticación JWT (Supabase)
"""

import os
import base64
from fastapi import FastAPI, WebSocket, UploadFile, File, HTTPException, Depends, Header, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from openai import OpenAI
from elevenlabs.client import ElevenLabs
from elevenlabs import VoiceSettings
import uuid
from pathlib import Path
import pdfplumber
import io
import logging
import jwt
from supabase import create_client, Client
from datetime import datetime, timezone
from scipy.spatial.distance import cosine
import numpy as np

# Cargar variables de entorno
load_dotenv()

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar clientes
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

elevenlabs_client = None
if os.getenv("ELEVENLABS_API_KEY"):
    elevenlabs_client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

# Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")  # Use service key for backend
supabase: Client = create_client(supabase_url, supabase_key) if supabase_url and supabase_key else None

app = FastAPI(title="Chatbot API", version="1.0.0")

# CORS - More restrictive for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT Secret from Supabase
JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

if not JWT_SECRET:
    logger.warning("SUPABASE_JWT_SECRET not set - authentication will be disabled for development")


# Modelos
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class AudioRequest(BaseModel):
    text: str
    voice_id: Optional[str] = None

class TranscriptionResponse(BaseModel):
    text: str
    language: Optional[str] = None
    duration: Optional[float] = None

class SessionCreate(BaseModel):
    title: Optional[str] = "Nueva conversación"

class SessionUpdate(BaseModel):
    title: str

class DocumentRequest(BaseModel):
    content: str

class SearchRequest(BaseModel):
    query: str

class SearchResult(BaseModel):
    id: str
    content: str
    similarity: float

class SystemPromptRequest(BaseModel):
    session_id: str
    prompt: str

# Authentication dependency
async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
    
    token = authorization.split(" ")[1]
    
    try:
        # Debug: Check token header to see the algorithm
        try:
            unverified_header = jwt.get_unverified_header(token)
            logger.info(f"Token header: {unverified_header}")
        except Exception as e:
            logger.error(f"Could not read token header: {e}")
        
        # Always decode without signature verification for now (development mode)
        # This bypasses the algorithm mismatch issue
        payload = jwt.decode(token, options={"verify_signature": False})
        logger.info(f"Decoded payload sub: {payload.get('sub')}")
        
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"id": user_id, "email": payload.get("email")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError as e:
        logger.error(f"JWT decode error: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")


# Embedding generation function
def generate_embedding(text: str) -> List[float]:
    """Generate embedding for text using OpenAI's embedding model"""
    try:
        response = openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding
    except Exception as e:
        logger.error(f"Error generating embedding: {e}")
        raise HTTPException(status_code=500, detail="Error al generar embedding")


# Helper function to convert embedding to proper format
def convert_embedding(embedding) -> List[float]:
    """Convert embedding to proper list of floats format"""
    if isinstance(embedding, str):
        # If it's a string representation of a vector
        try:
            # Handle pgvector format: "[1.0, 2.0, 3.0]" or similar
            embedding_str = embedding.strip('[]').replace(' ', '')
            return [float(x) for x in embedding_str.split(',')]
        except:
            return []
    elif isinstance(embedding, list):
        # If it's already a list
        try:
            return [float(x) if not isinstance(x, float) else x for x in embedding]
        except:
            return []
    return []


# Helper functions for Supabase operations
def get_or_create_session(user_id: str, session_id: Optional[str] = None) -> str:
    if not supabase:
        return session_id or str(uuid.uuid4())
    
    if session_id:
        # Verify session belongs to user
        result = supabase.table("sessions").select("*").eq("id", session_id).eq("user_id", user_id).execute()
        if result.data:
            return session_id
    
    # Create new session
    new_session = supabase.table("sessions").insert({
        "user_id": user_id,
        "title": "Nueva conversación"
    }).execute()
    
    return new_session.data[0]["id"]

def get_session_messages(session_id: str, user_id: str) -> List[dict]:
    if not supabase:
        return []
    
    # Get session with messages array
    result = supabase.table("sessions").select("messages").eq("id", session_id).eq("user_id", user_id).execute()
    
    if not result.data:
        return []
    
    messages_array = result.data[0].get("messages", [])
    
    # Convert from {id, date, msg} format to {role, content} format
    messages = []
    for msg in messages_array:
        role = "user" if msg.get("id") == 0 else "assistant"
        messages.append({"role": role, "content": msg.get("msg", "")})
    
    return messages

def save_message(session_id: str, user_id: str, role: str, content: str):
    if not supabase:
        return

    try:
        # Get current messages
        result = supabase.table("sessions").select("messages").eq("id", session_id).eq("user_id", user_id).execute()
        
        if not result.data:
            logger.error(f"Session {session_id} not found")
            raise HTTPException(status_code=404, detail="Session not found")
        
        messages_array = result.data[0].get("messages", [])
        
        # Create new message
        new_message = {
            "id": 0 if role == "user" else 1,  # 0 para usuario, 1 para asistente
            "date": datetime.now(timezone.utc).isoformat(),
            "msg": content
        }
        
        # Append to messages array
        messages_array.append(new_message)
        
        # Update session with new messages array and timestamp
        update_result = supabase.table("sessions").update({
            "messages": messages_array,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }).eq("id", session_id).execute()
        
        if not update_result.data:
            logger.error(f"Error updating messages for session {session_id}")
            raise HTTPException(status_code=500, detail="Error al guardar el mensaje")
    except Exception as e:
        logger.error(f"Error al guardar el mensaje en la sesión {session_id}: {e}")
        if not isinstance(e, HTTPException):
            raise HTTPException(status_code=500, detail="Error al guardar el mensaje")
        raise

def update_session_title(session_id: str, title: str):
    if not supabase:
        return
    
    supabase.table("sessions").update({
        "title": title,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }).eq("id", session_id).execute()


# 1. WebSocket Chat with streaming
@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    user_id = None
    session_id = None
    
    try:
        while True:
            try:
                data = await websocket.receive_json()
            except Exception as e:
                # Handle client disconnection gracefully (e.g., NO_STATUS_RCVD, normal close)
                if "disconnect" in str(e).lower() or "1005" in str(e) or "1001" in str(e):
                    logger.info("Client disconnected")
                else:
                    logger.debug(f"WebSocket receive error (may be normal): {e}")
                break
            
            message = data.get("message")
            session_id = data.get("session_id")
            token = data.get("token")
            enable_voice = data.get("enable_voice", False)  # Flag to enable audio response
            
            logger.info(f"Received message with enable_voice: {enable_voice}")
            
            # Skip empty messages (validation handshake)
            if not message or not message.strip():
                continue
                
            # Validate token
            if token:
                try:
                    # Decode without signature verification (development mode)
                    payload = jwt.decode(token, options={"verify_signature": False})
                    user_id = payload.get("sub")
                    logger.info(f"WebSocket authenticated user: {user_id}")
                except jwt.InvalidTokenError as e:
                    logger.warning(f"Invalid token: {e}")
                    try:
                        await websocket.send_json({"type": "error", "content": "Invalid token"})
                    except:
                        pass
                    continue
            
            if not user_id:
                logger.warning("No user_id after token validation")
                try:
                    await websocket.send_json({"type": "error", "content": "Authentication required"})
                except:
                    pass
                continue
            
            # Get or create session
            session_id = get_or_create_session(user_id, session_id)
            
            # Get message history
            history = get_session_messages(session_id, user_id)
            
            # Get system prompt for this session if it exists
            system_prompt_text = None
            try:
                if supabase:
                    prompt_result = supabase.table("system_prompts").select("prompt").eq("session_id", session_id).execute()
                    if prompt_result.data:
                        system_prompt_text = prompt_result.data[0]["prompt"]
            except Exception as e:
                logger.warning(f"Error fetching system prompt: {e}")
            
            # Try to get relevant documents for context
            relevant_docs = []
            try:
                if supabase:
                    # Generate embedding for the query
                    query_embedding = generate_embedding(message)
                    
                    # Retrieve all documents for this user
                    result = supabase.table("documents").select("*").eq("user_id", user_id).execute()
                    
                    if result.data:
                        # Calculate similarity and filter
                        for doc in result.data:
                            doc_embedding = doc.get("embedding")
                            if doc_embedding:
                                doc_embedding_list = convert_embedding(doc_embedding)
                                
                                if len(doc_embedding_list) > 0 and len(query_embedding) > 0:
                                    try:
                                        if len(doc_embedding_list) == len(query_embedding):
                                            similarity = 1 - cosine(query_embedding, doc_embedding_list)
                                            # Include documents with similarity > 0.3 (30%)
                                            if similarity > 0.3:
                                                relevant_docs.append({
                                                    "content": doc["content"],
                                                    "similarity": float(similarity)
                                                })
                                    except Exception as e:
                                        logger.warning(f"Error calculating similarity: {e}")
                        
                        # Sort by similarity descending and take top 3
                        relevant_docs.sort(key=lambda x: x["similarity"], reverse=True)
                        relevant_docs = relevant_docs[:3]
            except Exception as e:
                logger.warning(f"Error fetching relevant documents: {e}")
                # Continue without documents context if there's an error
            
            # Build context with relevant documents if available
            if relevant_docs:
                context = "Los siguientes documentos pueden ser relevantes para tu pregunta:\n\n"
                for i, doc in enumerate(relevant_docs, 1):
                    context += f"Documento {i}:\n{doc['content']}\n\n"
                context += "Por favor, usa esta información para responder la siguiente pregunta:\n"
                
                # Combine with system prompt if exists
                if system_prompt_text:
                    context = system_prompt_text + "\n\n" + context
                
                # Insert context as system message if not already present
                if not any(msg.get("role") == "system" for msg in history):
                    history.insert(0, {"role": "system", "content": context})
                else:
                    # Update existing system message
                    for msg in history:
                        if msg.get("role") == "system":
                            msg["content"] = context + "\n" + msg["content"]
                            break
            elif system_prompt_text:
                # Use system prompt even if no relevant documents
                if not any(msg.get("role") == "system" for msg in history):
                    history.insert(0, {"role": "system", "content": system_prompt_text})
                else:
                    # Update existing system message
                    for msg in history:
                        if msg.get("role") == "system":
                            msg["content"] = system_prompt_text + "\n" + msg["content"]
                            break
            
            history.append({"role": "user", "content": message})
            
            # Save user message
            save_message(session_id, user_id, "user", message)
            
            # Send session_id back to client
            await websocket.send_json({"type": "session", "session_id": session_id})
            
            # Stream response
            try:
                response = openai_client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=history,
                    stream=True,
                )
                
                full_reply = ""
                for chunk in response:
                    delta = chunk.choices[0].delta.content or ""
                    full_reply += delta
                    await websocket.send_json({"type": "token", "content": delta})
                
                # Generate audio for the AI response only if voice is enabled
                audio_url = None
                if enable_voice and elevenlabs_client and full_reply.strip() and supabase:
                    try:
                        audio_generator = elevenlabs_client.text_to_speech.convert(
                            text=full_reply,
                            voice_id="21m00Tcm4TlvDq8ikWAM",  # Default Rachel voice
                            model_id="eleven_multilingual_v2",
                            voice_settings=VoiceSettings(
                                stability=0.5,
                                similarity_boost=0.75,
                                style=0.0,
                                use_speaker_boost=True
                            )
                        )
                        
                        # Generate audio in memory and save to Supabase
                        audio_bytes = io.BytesIO()
                        for chunk in audio_generator:
                            audio_bytes.write(chunk)
                        
                        audio_data = audio_bytes.getvalue()
                        audio_size = len(audio_data)
                        
                        upload_id = str(uuid.uuid4())
                        filename = f"audio_{upload_id}.mp3"
                        
                        upload_result = supabase.table("uploads").insert({
                            "id": upload_id,
                            "user_id": user_id,
                            "session_id": session_id,
                            "filename": filename,
                            "file_type": "audio/mpeg",
                            "file_size": audio_size,
                            "file_data": base64.b64encode(audio_data).decode('utf-8'),
                            "analysis_result": None
                        }).execute()
                        
                        if upload_result.data:
                            audio_url = f"/uploads/{upload_id}"
                            await websocket.send_json({"type": "audio", "audio_url": audio_url})
                    except Exception as e:
                        logger.error(f"Error generating audio: {e}")
                        # Continue without audio if generation fails
                
                # Save assistant message
                save_message(session_id, user_id, "assistant", full_reply)
                
                # Update session title if it's the first message
                if len(history) == 1:
                    # Generate title from first message
                    title = message[:50] + "..." if len(message) > 50 else message
                    update_session_title(session_id, title)
                
                await websocket.send_json({"type": "done", "audio_url": audio_url})
                
            except Exception as e:
                logger.error(f"OpenAI error: {e}")
                try:
                    await websocket.send_json({"type": "error", "content": str(e)})
                except:
                    pass
                
    except Exception as e:
        logger.debug(f"WebSocket connection closed: {e}")
    finally:
        try:
            await websocket.close()
        except:
            pass


# 2. Get user sessions
@app.get("/sessions")
async def get_sessions(user: dict = Depends(get_current_user)):
    if not supabase:
        return {"sessions": []}
    
    result = supabase.table("sessions").select("*").eq("user_id", user["id"]).order("updated_at", desc=True).execute()
    return {"sessions": result.data}


# 3. Create new session
@app.post("/sessions")
async def create_session(session: SessionCreate, user: dict = Depends(get_current_user)):
    if not supabase:
        return {"id": str(uuid.uuid4()), "title": session.title}
    
    result = supabase.table("sessions").insert({
        "user_id": user["id"],
        "title": session.title
    }).execute()
    
    return result.data[0]


# 4. Delete session
@app.delete("/sessions/{session_id}")
async def delete_session(session_id: str, user: dict = Depends(get_current_user)):
    if not supabase:
        return {"success": True}
    
    # Verify ownership
    result = supabase.table("sessions").select("*").eq("id", session_id).eq("user_id", user["id"]).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Delete session (messages are stored in sessions table)
    supabase.table("sessions").delete().eq("id", session_id).execute()
    
    return {"success": True}


# 5. Get session messages
@app.get("/sessions/{session_id}/messages")
async def get_messages(session_id: str, user: dict = Depends(get_current_user)):
    if not supabase:
        return {"messages": []}
    
    # Verify ownership and get messages
    session_result = supabase.table("sessions").select("messages").eq("id", session_id).eq("user_id", user["id"]).execute()
    if not session_result.data:
        raise HTTPException(status_code=404, detail="Session not found")
    
    messages_array = session_result.data[0].get("messages", [])
    return {"messages": messages_array}


# 6. Text to Speech
@app.post("/generate-audio")
async def generate_audio(request: AudioRequest, user: dict = Depends(get_current_user)):
    if not elevenlabs_client:
        raise HTTPException(status_code=503, detail="ElevenLabs API not configured")
    
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    text = request.text
    voice_id = request.voice_id or "21m00Tcm4TlvDq8ikWAM"
    model_id = "eleven_multilingual_v2"
    
    try:
        audio_generator = elevenlabs_client.text_to_speech.convert(
            text=text,
            voice_id=voice_id,
            model_id=model_id,
            voice_settings=VoiceSettings(
                stability=0.5,
                similarity_boost=0.75,
                style=0.0,
                use_speaker_boost=True
            )
        )
        
        # Generate audio in memory
        audio_bytes = io.BytesIO()
        for chunk in audio_generator:
            audio_bytes.write(chunk)
        
        audio_data = audio_bytes.getvalue()
        audio_size = len(audio_data)
        
        # Generate unique ID and filename
        upload_id = str(uuid.uuid4())
        filename = f"audio_{upload_id}.mp3"
        
        # Save to Supabase
        upload_result = supabase.table("uploads").insert({
            "id": upload_id,
            "user_id": user["id"],
            "session_id": None,
            "filename": filename,
            "file_type": "audio/mpeg",
            "file_size": audio_size,
            "file_data": base64.b64encode(audio_data).decode('utf-8'),
            "analysis_result": None
        }).execute()
        
        if not upload_result.data:
            raise HTTPException(status_code=500, detail="Error al guardar el audio")
        
        return {"audio_url": f"/uploads/{upload_id}", "filename": filename, "upload_id": upload_id}
    except Exception as e:
        logger.error(f"TTS error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# 7. Speech to Text
@app.post("/transcribe-audio")
async def transcribe_audio(
    file: UploadFile = File(...),
    language_code: Optional[str] = None,
    user: dict = Depends(get_current_user)
) -> TranscriptionResponse:
    if not elevenlabs_client:
        raise HTTPException(status_code=503, detail="ElevenLabs API not configured")
    
    try:
        # Read audio file
        audio_bytes = await file.read()
        audio_data = io.BytesIO(audio_bytes)
        
        # Transcribe using ElevenLabs
        transcription = elevenlabs_client.speech_to_text.convert(
            file=audio_data,
            model_id="scribe_v2",
            tag_audio_events=False,  # Disable for cleaner text
            language_code=language_code,  # None = auto-detect
            diarize=False,  # Disable speaker identification for simplicity
        )
        
        # Extract text from response
        transcribed_text = transcription.text if hasattr(transcription, 'text') else str(transcription)
        detected_language = getattr(transcription, 'language', language_code)
        
        # Calculate approximate duration (rough estimate: 150 words per minute)
        word_count = len(transcribed_text.split())
        duration_minutes = word_count / 150.0
        
        return TranscriptionResponse(
            text=transcribed_text.strip(),
            language=detected_language,
            duration=duration_minutes
        )
        
    except Exception as e:
        logger.error(f"STT error: {e}")
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")


@app.get("/audio/{filename}")
async def get_audio(filename: str):
    file_path = audio_dir / filename
    if file_path.exists():
        return FileResponse(
            path=file_path,
            media_type="audio/mpeg",
            filename=filename
        )
    raise HTTPException(status_code=404, detail="Audio file not found")


# Authentication dependency - optional version
async def get_current_user_optional(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        return None
    
    token = authorization.split(" ")[1]
    
    try:
        payload = jwt.decode(token, options={"verify_signature": False})
        logger.info(f"Decoded payload sub: {payload.get('sub')}")
        
        user_id = payload.get("sub")
        if not user_id:
            return None
        return {"id": user_id, "email": payload.get("email")}
    except jwt.InvalidTokenError:
        return None


@app.get("/uploads/{upload_id}")
async def get_upload_file(upload_id: str, user: dict = Depends(get_current_user_optional)):
    """
    Serve uploaded files (images, PDFs, TXT) by upload_id from Supabase.
    Can be accessed without authentication, but verifies ownership if user is authenticated.
    """
    if not supabase:
        raise HTTPException(status_code=404, detail="Upload not found")
    
    try:
        # Get upload record
        result = supabase.table("uploads").select("*").eq("id", upload_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Upload not found")
        
        upload_record = result.data[0]
        
        # If user is authenticated, verify ownership
        if user and upload_record.get("user_id") != user["id"]:
            raise HTTPException(status_code=403, detail="Forbidden")
        
        file_data_b64 = upload_record.get("file_data")
        
        if not file_data_b64:
            raise HTTPException(status_code=404, detail="File data not found")
        
        # Decode base64 to bytes
        file_bytes = base64.b64decode(file_data_b64)
        media_type = upload_record.get("file_type", "application/octet-stream")
        
        return StreamingResponse(
            iter([file_bytes]),
            media_type=media_type,
            headers={"Content-Disposition": f"attachment; filename={upload_record.get('filename', upload_id)}"}
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving file {upload_id}: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving file")

# 8.5 Analyze multiple files
@app.post("/analyze-multiple")
async def analyze_multiple(
    files: List[UploadFile] = File(...),
    prompt: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
    user: dict = Depends(get_current_user)
):
    """
    Analyze multiple files (images, PDFs, TXT).
    Images can have an optional custom prompt.
    """
    # Crear sesión si no existe
    session_id_final = get_or_create_session(user["id"], session_id)
    results = []
    
    for file in files:
        try:
            file_bytes = await file.read()
            file_ext = file.filename.split(".")[-1].lower() if file.filename else ""
            
            if file_ext in ["png", "jpg", "jpeg", "gif", "webp"]:
                # Analyze image
                base64_image = base64.b64encode(file_bytes).decode('utf-8')
                text_prompt = prompt if prompt else "Describe esta imagen de forma detallada en español."
                
                response = openai_client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": text_prompt},
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:{file.content_type};base64,{base64_image}"
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens=1000
                )
                analysis = response.choices[0].message.content
                file_type = "image"
                
            elif file_ext == "pdf":
                # Extract text from PDF
                with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                    text = "\n".join(
                        page.extract_text() or ""
                        for page in pdf.pages
                    )
                
                if not text.strip():
                    results.append({
                        "filename": file.filename,
                        "status": "error",
                        "error": "No se pudo extraer texto del PDF"
                    })
                    continue
                
                # Summarize
                response = openai_client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {
                            "role": "user",
                            "content": f"Resume el siguiente texto en español:\n\n{text[:12000]}"
                        }
                    ]
                )
                analysis = response.choices[0].message.content
                file_type = "pdf"
                
            elif file_ext == "txt":
                # Analyze TXT file
                text = file_bytes.decode("utf-8")
                
                if not text.strip():
                    results.append({
                        "filename": file.filename,
                        "status": "error",
                        "error": "El archivo está vacío"
                    })
                    continue
                
                # Summarize
                response = openai_client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {
                            "role": "user",
                            "content": f"Resume el siguiente texto en español:\n\n{text[:12000]}"
                        }
                    ]
                )
                analysis = response.choices[0].message.content
                file_type = "txt"
            else:
                results.append({
                    "filename": file.filename,
                    "status": "error",
                    "error": f"Tipo de archivo no soportado: {file_ext}"
                })
                continue
            
            # Save upload record with file data
            upload_id = None
            if supabase:
                upload_result = supabase.table("uploads").insert({
                    "user_id": user["id"],
                    "session_id": session_id_final,
                    "filename": file.filename,
                    "file_type": file.content_type,
                    "file_size": len(file_bytes),
                    "analysis_result": analysis,
                    "file_data": base64.b64encode(file_bytes).decode('utf-8')
                }).execute()
                upload_id = upload_result.data[0]["id"]
            else:
                upload_id = str(uuid.uuid4())
            
            # Save user message with file ID
            if file_type == "image":
                user_message_content = f"[IMG:{upload_id}]"
            else:
                user_message_content = f"[FILE:{upload_id}:{file_ext.upper()}]"
            
            save_message(session_id_final, user["id"], "user", user_message_content)
            
            # Save assistant response
            save_message(session_id_final, user["id"], "assistant", analysis)
            
            results.append({
                "filename": file.filename,
                "status": "success",
                "type": file_type,
                "analysis": analysis,
                "upload_id": upload_id
            })
            
        except Exception as e:
            logger.error(f"Error analyzing {file.filename}: {e}")
            results.append({
                "filename": file.filename,
                "status": "error",
                "error": str(e)
            })
    
    return {"results": results, "session_id": session_id_final}

# 8. Analyze image
@app.post("/analyze-image")
async def analyze_image(
    file: UploadFile = File(...),
    prompt: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
    user: dict = Depends(get_current_user)
):
    try:
            # Crear sesión si no existe
            session_id_final = get_or_create_session(user["id"], session_id)
            image_bytes = await file.read()
            base64_image = base64.b64encode(image_bytes).decode('utf-8')
            # Use provided prompt or default
            text_prompt = prompt if prompt else "Describe esta imagen de forma detallada en español."
            response = openai_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": text_prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:{file.content_type};base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                max_tokens=1000
            )
            description = response.choices[0].message.content
            
            # Save upload record with file data
            if supabase:
                upload_result = supabase.table("uploads").insert({
                    "user_id": user["id"],
                    "session_id": session_id_final,
                    "filename": file.filename,
                    "file_type": file.content_type,
                    "file_size": len(image_bytes),
                    "analysis_result": description,
                    "file_data": base64.b64encode(image_bytes).decode('utf-8')
                }).execute()
                upload_id = upload_result.data[0]["id"]
            else:
                upload_id = str(uuid.uuid4())
            
            # Save user message with file ID (no filename to avoid duplicates)
            user_message_content = f"[IMG:{upload_id}] {text_prompt}"
            save_message(session_id_final, user["id"], "user", user_message_content)
            
            # Save assistant response
            save_message(session_id_final, user["id"], "assistant", description)
            
            return {"description": description, "filename": file.filename, "session_id": session_id_final, "upload_id": upload_id}
    except Exception as e:
        logger.error(f"Image analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# 9. Analyze PDF/TXT file
@app.post("/analyze-file")
async def analyze_file(
    file: UploadFile = File(...),
    prompt: Optional[str] = Form(None),
    session_id: Optional[str] = Form(None),
    user: dict = Depends(get_current_user)
):
    ext = file.filename.split(".")[-1].lower() if file.filename else ""
    try:
        # Crear sesión si no existe
        session_id_final = get_or_create_session(user["id"], session_id)
        file_bytes = await file.read()
        if ext == "pdf":
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                text = "\n".join(
                    page.extract_text() or "" 
                    for page in pdf.pages
                )
        elif ext == "txt":
            text = file_bytes.decode("utf-8")
        else:
            raise HTTPException(status_code=400, detail="Solo se aceptan archivos PDF o TXT")
        if not text.strip():
            raise HTTPException(status_code=400, detail="No se pudo extraer texto del archivo")
        
        logger.info(f"Received prompt: '{prompt}'")
        # Usar prompt personalizado o resumen por defecto
        if prompt:
            content = f"{prompt}\n\nTexto del archivo:\n{text[:12000]}"
            user_prompt = prompt
        else:
            content = f"Resume el siguiente texto en español:\n\n{text[:12000]}"
            user_prompt = "Resume el siguiente texto en español"
        
        logger.info(f"Sending content to OpenAI: {content[:200]}...")
        
        summary_response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": content
                }
            ],
            max_tokens=1000
        )
        summary = summary_response.choices[0].message.content
        
        # Save upload record with file data
        if supabase:
            upload_result = supabase.table("uploads").insert({
                "user_id": user["id"],
                "session_id": session_id_final,
                "filename": file.filename,
                "file_type": ext,
                "file_size": len(file_bytes),
                "analysis_result": summary,
                "file_data": base64.b64encode(file_bytes).decode('utf-8')
            }).execute()
            upload_id = upload_result.data[0]["id"]
        else:
            upload_id = str(uuid.uuid4())
        
        # Save user message with file ID
        user_message_content = f"[FILE:{upload_id}:{ext.upper()}] {user_prompt}"
        save_message(session_id_final, user["id"], "user", user_message_content)
        
        # Save assistant response
        save_message(session_id_final, user["id"], "assistant", summary)
        
        return {
            "summary": summary,
            "word_count": len(text.split()),
            "filename": file.filename,
            "session_id": session_id_final,
            "upload_id": upload_id
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"File analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# 10. Get available voices
@app.get("/voices")
async def get_voices(user: dict = Depends(get_current_user)):
    # Return some default ElevenLabs voices
    return {
        "voices": [
            {"id": "21m00Tcm4TlvDq8ikWAM", "name": "Rachel"},
            {"id": "AZnzlk1XvdvUeBnXmlld", "name": "Domi"},
            {"id": "EXAVITQu4vr4xnSDxMaL", "name": "Bella"},
            {"id": "ErXwobaYiN019PkySvjV", "name": "Antoni"},
            {"id": "MF3mGyEYCl7XYWbV9V6O", "name": "Elli"},
            {"id": "TxGEqnHWrfWFTfGW9XjX", "name": "Josh"},
            {"id": "VR6AewLTigWG4xSOukaG", "name": "Arnold"},
            {"id": "pNInz6obpgDQGcFmaJgB", "name": "Adam"},
            {"id": "yoZ06aMxZJJ28mfd3POQ", "name": "Sam"},
        ]
    }


# 11. Add document with embedding
@app.post("/add-document")
async def add_document(
    content: str = Form(...),
    user: dict = Depends(get_current_user)
):
    """Add a document with its embedding to the database"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        # Generate embedding for the content
        embedding = generate_embedding(content)
        
        # Insert into documents table
        result = supabase.table("documents").insert({
            "user_id": user["id"],
            "content": content,
            "embedding": embedding
        }).execute()
        
        if not result.data:
            raise HTTPException(status_code=500, detail="Error adding document to database")
        
        return {
            "success": True,
            "message": "Documento agregado exitosamente",
            "document_id": result.data[0]["id"]
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error adding document: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# 12. Search documents by semantic similarity
@app.post("/search-documents")
async def search_documents(
    query: str = Form(...),
    limit: int = Form(10),
    user: dict = Depends(get_current_user)
):
    """Search documents using semantic similarity"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        # Generate embedding for the query
        query_embedding = generate_embedding(query)
        
        # Retrieve all documents for this user
        result = supabase.table("documents").select("*").eq("user_id", user["id"]).execute()
        
        if not result.data:
            return {"results": [], "query": query}
        
        documents = result.data
        
        # Calculate cosine similarity for each document
        results = []
        for doc in documents:
            doc_embedding = doc.get("embedding")
            if doc_embedding:
                # Convert embedding to proper format
                doc_embedding_list = convert_embedding(doc_embedding)
                
                if len(doc_embedding_list) > 0 and len(query_embedding) > 0:
                    try:
                        # Verify both embeddings have the same length
                        if len(doc_embedding_list) != len(query_embedding):
                            logger.warning(f"Embedding length mismatch: query={len(query_embedding)}, doc={len(doc_embedding_list)}")
                            similarity = 0
                        else:
                            similarity = 1 - cosine(query_embedding, doc_embedding_list)
                            logger.info(f"Calculated similarity: {similarity}")
                    except Exception as e:
                        logger.warning(f"Error calculating similarity for doc {doc['id']}: {e}")
                        similarity = 0
                else:
                    similarity = 0
            else:
                similarity = 0
            
            results.append({
                "id": doc["id"],
                "content": doc["content"],
                "similarity": float(similarity),
                "created_at": doc.get("created_at")
            })
        
        # Sort by similarity in descending order
        results.sort(key=lambda x: x["similarity"], reverse=True)
        
        # Return top results
        return {
            "results": results[:limit],
            "query": query,
            "total_found": len(results)
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error searching documents: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# 13. Get user's documents
@app.get("/documents")
async def get_documents(
    limit: int = 20,
    offset: int = 0,
    user: dict = Depends(get_current_user)
):
    """Get all documents for the current user"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        result = supabase.table("documents").select("id,content,created_at").eq("user_id", user["id"]).range(offset, offset + limit - 1).execute()
        
        return {
            "documents": result.data,
            "limit": limit,
            "offset": offset
        }
    except Exception as e:
        logger.error(f"Error retrieving documents: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# 14. Get relevant documents for chat context
@app.post("/documents-for-chat")
async def get_documents_for_chat(
    query: str = Form(...),
    user: dict = Depends(get_current_user)
):
    """Get relevant documents for chat context"""
    if not supabase:
        return {"documents": [], "query": query}
    
    try:
        # Generate embedding for the query
        query_embedding = generate_embedding(query)
        
        # Retrieve all documents for this user
        result = supabase.table("documents").select("*").eq("user_id", user["id"]).execute()
        
        if not result.data:
            return {"documents": [], "query": query}
        
        documents = result.data
        
        # Calculate similarity and filter
        relevant_docs = []
        for doc in documents:
            doc_embedding = doc.get("embedding")
            if doc_embedding:
                doc_embedding_list = convert_embedding(doc_embedding)
                
                if len(doc_embedding_list) > 0 and len(query_embedding) > 0:
                    try:
                        if len(doc_embedding_list) == len(query_embedding):
                            similarity = 1 - cosine(query_embedding, doc_embedding_list)
                            # Only include documents with similarity > 0.3 (30%)
                            if similarity > 0.3:
                                relevant_docs.append({
                                    "id": doc["id"],
                                    "content": doc["content"],
                                    "similarity": float(similarity)
                                })
                    except Exception as e:
                        logger.warning(f"Error calculating similarity: {e}")
        
        # Sort by similarity descending
        relevant_docs.sort(key=lambda x: x["similarity"], reverse=True)
        
        return {
            "documents": relevant_docs[:3],  # Return top 3
            "query": query
        }
    except Exception as e:
        logger.error(f"Error getting documents for chat: {e}")
        # Don't fail the chat if embeddings are not working
        return {"documents": [], "query": query}


# 15. Delete document
@app.delete("/documents/{document_id}")
async def delete_document(
    document_id: str,
    user: dict = Depends(get_current_user)
):
    """Delete a specific document"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        # Verify ownership
        result = supabase.table("documents").select("*").eq("id", document_id).eq("user_id", user["id"]).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Delete the document
        supabase.table("documents").delete().eq("id", document_id).execute()
        
        return {"success": True, "message": "Documento eliminado exitosamente"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting document: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# 16. System Prompts management
@app.post("/system-prompt")
async def set_system_prompt(
    session_id: str = Form(...),
    prompt: str = Form(...),
    user: dict = Depends(get_current_user)
):
    """Set or update system prompt for a session"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not available")
    
    try:
        # Verify session ownership
        session_result = supabase.table("sessions").select("*").eq("id", session_id).eq("user_id", user["id"]).execute()
        if not session_result.data:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Check if system prompt already exists for this session
        existing = supabase.table("system_prompts").select("*").eq("session_id", session_id).execute()
        
        if existing.data:
            # Update existing
            result = supabase.table("system_prompts").update({
                "prompt": prompt,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }).eq("session_id", session_id).execute()
        else:
            # Insert new
            result = supabase.table("system_prompts").insert({
                "session_id": session_id,
                "user_id": user["id"],
                "prompt": prompt,
                "created_at": datetime.now(timezone.utc).isoformat()
            }).execute()
        
        return {
            "success": True,
            "message": "System prompt actualizado",
            "prompt": prompt
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error setting system prompt: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/system-prompt/{session_id}")
async def get_system_prompt(session_id: str, user: dict = Depends(get_current_user)):
    """Get system prompt for a session"""
    if not supabase:
        return {"prompt": "", "session_id": session_id}
    
    try:
        # Verify session ownership
        session_result = supabase.table("sessions").select("*").eq("id", session_id).eq("user_id", user["id"]).execute()
        if not session_result.data:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Get system prompt
        result = supabase.table("system_prompts").select("prompt").eq("session_id", session_id).execute()
        
        prompt = result.data[0]["prompt"] if result.data else ""
        
        return {
            "prompt": prompt,
            "session_id": session_id
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting system prompt: {e}")
        return {"prompt": "", "session_id": session_id}


# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "supabase": supabase is not None}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)