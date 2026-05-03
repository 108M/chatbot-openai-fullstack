"""
Database operations for the ChatBot API
"""
import uuid
from typing import List, Optional
from datetime import datetime, timezone
from fastapi import HTTPException
from config import supabase, openai_client, logger


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


def get_or_create_session(user_id: str, session_id: Optional[str] = None) -> str:
    """Get existing session or create new one"""
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
    """Get all messages from a session"""
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
    """Save a message to a session"""
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
    """Update the title of a session"""
    if not supabase:
        return
    
    supabase.table("sessions").update({
        "title": title,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }).eq("id", session_id).execute()
