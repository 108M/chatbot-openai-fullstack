"""
Eleven Labs Agent with Webhook Support
Handles real-time conversations with Eleven Labs Conversational AI agent.

Note: Eleven Labs Agent generates responses automatically using its own AI.
This webhook is used for:
- Logging/auditing conversations to database
- Executing secondary actions based on user input
- Adding personalized context to the agent
"""
import os
import os
import uuid
import logging
import json
import hmac
import hashlib
from datetime import datetime
from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel
from config import logger, supabase, elevenlabs_client
from database import get_or_create_session, save_message

router = APIRouter()

# ============================================================================
# MODELS
# ============================================================================

class ElevenLabsUserMessage(BaseModel):
    """User message received from Eleven Labs Agent"""
    user_id: str
    message: str
    language: Optional[str] = None
    audio_url: Optional[str] = None


class ElevenLabsAgentEvent(BaseModel):
    """Event from Eleven Labs webhook"""
    event_type: str  # "user_message", "agent_started", "session_ended", etc.
    agent_id: str
    session_id: str
    timestamp: str
    data: Dict[str, Any]


class AgentResponse(BaseModel):
    """Response to send back to Eleven Labs"""
    type: str  # "text" or "audio"
    content: str  # Text content or audio URL
    session_id: str


# ============================================================================
# CONFIGURATION
# ============================================================================

# Your Agent ID from Eleven Labs dashboard (set in .env)
EXPECTED_AGENT_ID = os.getenv("ELEVENLABS_AGENT_ID")
if EXPECTED_AGENT_ID:
    logger.info(f"Eleven Labs Agent ID configured: {EXPECTED_AGENT_ID[:20]}...")
else:
    logger.warning("ELEVENLABS_AGENT_ID not set - webhook validation will be skipped")


# ============================================================================
# AGENT CONFIGURATION
# ============================================================================

ELEVENLABS_WEBHOOK_SECRET = "your_secret_key_here"  # Set in .env
AGENT_SYSTEM_PROMPT = """You are a helpful assistant integrated with Eleven Labs.
You maintain context throughout the conversation and respond naturally.
Keep responses concise but informative.
When asked to perform actions, explain what you can do."""


# ============================================================================
# WEBHOOK ENDPOINT
# ============================================================================

@router.post("/webhook/elevenlabs")
async def handle_elevenlabs_webhook(
    request: Request,
    x_eleven_labs_signature: Optional[str] = Header(None)
):
    """
    Webhook endpoint for Eleven Labs Agent events.
    
    Eleven Labs Agent handles conversations automatically.
    This webhook simply logs/stores conversation data in the database.
    
    Setup:
    1. Create agent at: https://elevenlabs.io/app/agents
    2. Set webhook URL to: https://<your-render-url>/webhook/elevenlabs
    3. Configure events: user_message, agent_response
    
    Flow:
    1. User speaks to agent → Eleven Labs processes & responds (no backend needed)
    2. Agent sends webhook event → Backend logs to database
    3. (Optional) Backend can trigger secondary actions
    """
    try:
        # Read raw body bytes for signature verification
        body_bytes = await request.body()

        # If a webhook secret is configured, validate HMAC-SHA256 signature
        webhook_secret = os.getenv("ELEVENLABS_WEBHOOK_SECRET")
        if webhook_secret:
            if not x_eleven_labs_signature:
                logger.warning("Missing webhook signature header")
                raise HTTPException(status_code=403, detail="Missing webhook signature")

            # Header may be plain hex or prefixed (e.g., sha256=...)
            sig_header = x_eleven_labs_signature
            if sig_header.startswith("sha256="):
                sig_header = sig_header.split("=", 1)[1]

            computed = hmac.new(webhook_secret.encode(), body_bytes, hashlib.sha256).hexdigest()
            if not hmac.compare_digest(computed, sig_header):
                logger.warning("Webhook signature mismatch (computed=%s, header=%s)", computed, sig_header)
                raise HTTPException(status_code=403, detail="Invalid webhook signature")

        # Parse JSON payload after validation
        body = json.loads(body_bytes.decode("utf-8"))
        event_type = body.get("event_type")
        agent_id = body.get("agent_id")
        session_id = body.get("session_id", str(uuid.uuid4()))

        # Validate agent_id if configured
        if EXPECTED_AGENT_ID and agent_id != EXPECTED_AGENT_ID:
            logger.warning(
                f"Webhook from unexpected agent_id: {agent_id} "
                f"(expected: {EXPECTED_AGENT_ID})"
            )
            raise HTTPException(status_code=403, detail="Agent ID mismatch")

        logger.info(
            f"Eleven Labs webhook received: "
            f"event_type={event_type}, agent_id={agent_id}, session_id={session_id}"
        )
        
        # Handle different event types
        if event_type == "user_message":
            return await _log_user_message(body, session_id, agent_id)
        
        elif event_type == "agent_response":
            return await _log_agent_response(body, session_id, agent_id)
        
        elif event_type == "agent_started":
            logger.info(f"Agent session started: {session_id}")
            return {"status": "ok", "message": "Agent session initiated"}
        
        elif event_type == "session_ended":
            logger.info(f"Agent session ended: {session_id}")
            return {"status": "ok", "message": "Session cleaned up"}
        
        else:
            logger.warning(f"Unknown event type: {event_type}")
            return {"status": "ok", "message": f"Event type {event_type} received"}
    
    except Exception as e:
        logger.exception("Error handling Eleven Labs webhook")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# MESSAGE LOGGING
# ============================================================================

async def _log_user_message(body: Dict[str, Any], session_id: str, agent_id: str):
    """Log user message to database. Agent already handled the response."""
    try:
        data = body.get("data", {})
        user_message = data.get("message", "")
        user_id = body.get("user_id", "agent_user")
        language = data.get("language", "es")
        
        if not user_message.strip():
            return {"status": "ok", "message": "Empty message ignored"}
        
        logger.info(f"Logging user message: {user_message[:50]}...")
        
        # Get or create session in database
        db_session_id = get_or_create_session(user_id, session_id)
        
        # Save user message to database
        save_message(db_session_id, user_id, "user", user_message)
        
        logger.info(f"User message saved to database")
        
        # Optional: Trigger secondary actions based on message content
        # Example: Send notifications, update user context, etc.
        await _handle_user_actions(user_message, user_id, db_session_id)
        
        return {
            "status": "ok",
            "session_id": db_session_id,
            "message": "User message logged"
        }
    
    except Exception as e:
        logger.exception("Error logging user message")
        raise HTTPException(status_code=500, detail=str(e))


async def _log_agent_response(body: Dict[str, Any], session_id: str, agent_id: str):
    """Log agent response to database."""
    try:
        data = body.get("data", {})
        agent_message = data.get("message", "")
        user_id = body.get("user_id", "agent_user")
        
        if not agent_message.strip():
            return {"status": "ok", "message": "Empty response ignored"}
        
        logger.info(f"Logging agent response: {agent_message[:50]}...")
        
        # Get session
        db_session_id = get_or_create_session(user_id, session_id)
        
        # Save agent message to database
        save_message(db_session_id, user_id, "assistant", agent_message)
        
        logger.info(f"Agent response saved to database")
        
        return {
            "status": "ok",
            "session_id": db_session_id,
            "message": "Agent response logged"
        }
    
    except Exception as e:
        logger.exception("Error logging agent response")
        raise HTTPException(status_code=500, detail=str(e))


async def _handle_user_actions(message: str, user_id: str, session_id: str):
    """
    Optional: Trigger secondary actions based on user message.
    Examples:
    - Send notifications
    - Update user context
    - Fetch external data
    - Trigger integrations
    """
    try:
        # Example: If message contains specific keywords, take action
        keywords = {
            "ayuda": "send_help_email",
            "reportar": "create_support_ticket",
            "datos": "fetch_user_data"
        }
        
        for keyword, action in keywords.items():
            if keyword.lower() in message.lower():
                logger.info(f"Triggered action: {action} for user {user_id}")
                # TODO: Implement your custom actions here
                # await execute_action(action, user_id, session_id)
                break
    
    except Exception as e:
        logger.warning(f"Error handling user actions: {e}")
        # Don't raise - actions are optional


# ============================================================================
# AGENT SETUP AND MANAGEMENT
# ============================================================================

@router.post("/agent/create")
async def create_agent_config(
    agent_name: str = "ChatBot Assistant",
    webhook_url: Optional[str] = None
):
    """
    Helper endpoint to create agent configuration.
    
    You still need to create the agent manually at:
    https://elevenlabs.io/app/agents
    
    Then configure:
    - Webhook URL: https://<your-render-url>/webhook/elevenlabs
    - Webhook events: user_message, agent_started, session_ended
    """
    return {
        "agent_name": agent_name,
        "webhook_url": webhook_url or "https://<your-render-url>/webhook/elevenlabs",
        "instructions": """
        1. Go to https://elevenlabs.io/app/agents
        2. Create a new agent
        3. Configure these settings:
           - Name: {agent_name}
           - Webhook URL: {webhook_url}
           - Subscribe to events: user_message, agent_started, session_ended
        4. Copy the agent_id and configure it in your frontend
        5. Test by speaking to your agent
        """.format(agent_name=agent_name, webhook_url=webhook_url),
        "backend_endpoint": "/webhook/elevenlabs",
        "authentication": "Bearer token (optional, set X-API-Key header)"
    }


@router.get("/agent/status")
async def get_agent_status():
    """Check if backend can handle agent webhooks (health check)"""
    agent_id_masked = f"{EXPECTED_AGENT_ID[:15]}..." if EXPECTED_AGENT_ID else None
    return {
        "status": "healthy",
        "webhook_endpoint": "/webhook/elevenlabs",
        "agent_id": agent_id_masked,
        "agent_configured": EXPECTED_AGENT_ID is not None,
        "elevenlabs_configured": elevenlabs_client is not None,
        "supabase_configured": supabase is not None,
        "timestamp": datetime.utcnow().isoformat()
    }


# ============================================================================
# DEBUG ENDPOINT
# ============================================================================

@router.post("/agent/test-webhook")
async def test_webhook():
    """
    Test the webhook with simulated Eleven Labs events.
    Useful for debugging without needing an actual agent.
    """
    test_agent_id = EXPECTED_AGENT_ID or "agent_test_123"
    
    test_user_message = {
        "event_type": "user_message",
        "agent_id": test_agent_id,
        "session_id": str(uuid.uuid4()),
        "user_id": "test_user",
        "timestamp": datetime.utcnow().isoformat(),
        "data": {
            "message": "Hola, ¿cuál es tu nombre?",
            "language": "es"
        }
    }
    
    test_agent_response = {
        "event_type": "agent_response",
        "agent_id": test_agent_id,
        "session_id": test_user_message["session_id"],
        "user_id": "test_user",
        "timestamp": datetime.utcnow().isoformat(),
        "data": {
            "message": "Me llamo Asistente de Eleven Labs. ¿En qué puedo ayudarte?",
        }
    }
    
    logger.info("Testing webhook with simulated events")
    
    try:
        # Test user message logging
        result1 = await _log_user_message(test_user_message, test_user_message["session_id"], test_user_message["agent_id"])
        
        # Test agent response logging
        result2 = await _log_agent_response(test_agent_response, test_agent_response["session_id"], test_agent_response["agent_id"])
        
        return {
            "status": "test_ok",
            "session_id": test_user_message["session_id"],
            "results": [result1, result2]
        }
    except Exception as e:
        logger.exception("Test webhook failed")
        return {
            "status": "test_error",
            "error": str(e)
        }
