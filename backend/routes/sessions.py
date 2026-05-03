"""
Session management endpoints
"""
import uuid
from fastapi import APIRouter, Depends, HTTPException
from config import supabase
from auth import get_current_user
from models import SessionCreate, SessionUpdate

router = APIRouter()


@router.get("/sessions")
async def get_sessions(user: dict = Depends(get_current_user)):
    """Get all sessions for the current user"""
    if not supabase:
        return {"sessions": []}
    
    result = supabase.table("sessions").select("*").eq("user_id", user["id"]).order("updated_at", desc=True).execute()
    return {"sessions": result.data}


@router.post("/sessions")
async def create_session(session: SessionCreate, user: dict = Depends(get_current_user)):
    """Create a new session"""
    if not supabase:
        return {"id": str(uuid.uuid4()), "title": session.title}
    
    result = supabase.table("sessions").insert({
        "user_id": user["id"],
        "title": session.title
    }).execute()
    
    return result.data[0]


@router.delete("/sessions/{session_id}")
async def delete_session(session_id: str, user: dict = Depends(get_current_user)):
    """Delete a session"""
    if not supabase:
        return {"success": True}
    
    # Verify ownership
    result = supabase.table("sessions").select("*").eq("id", session_id).eq("user_id", user["id"]).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Delete session (messages are stored in sessions table)
    supabase.table("sessions").delete().eq("id", session_id).execute()
    
    return {"success": True}


@router.get("/sessions/{session_id}/messages")
async def get_messages(session_id: str, user: dict = Depends(get_current_user)):
    """Get all messages from a session"""
    if not supabase:
        return {"messages": []}
    
    # Verify ownership and get messages
    session_result = supabase.table("sessions").select("messages").eq("id", session_id).eq("user_id", user["id"]).execute()
    if not session_result.data:
        raise HTTPException(status_code=404, detail="Session not found")
    
    messages_array = session_result.data[0].get("messages", [])
    return {"messages": messages_array}



@router.patch("/sessions/{session_id}")
async def update_session(session_id: str, session: SessionUpdate, user: dict = Depends(get_current_user)):
    """Update session title"""
    if not supabase:
        return {"id": session_id, "title": session.title}

    # Verify ownership
    result = supabase.table("sessions").select("*").eq("id", session_id).eq("user_id", user["id"]).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Session not found")

    upd = supabase.table("sessions").update({"title": session.title}).eq("id", session_id).execute()

    # Return updated record if available
    if upd.data:
        return upd.data[0]

    raise HTTPException(status_code=500, detail="Failed to update session")
