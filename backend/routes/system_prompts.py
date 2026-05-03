"""
System prompts management endpoints
"""
from datetime import datetime, timezone
from fastapi import APIRouter, Form, Depends, HTTPException
from config import logger, supabase
from auth import get_current_user

router = APIRouter()


@router.post("/system-prompt")
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


@router.get("/system-prompt/{session_id}")
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
