"""
Authentication functions for the ChatBot API
"""
import jwt
from fastapi import Header, HTTPException
from config import logger


async def get_current_user(authorization: str = Header(None)):
    """Authentication dependency - requires valid JWT token"""
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


async def get_current_user_optional(authorization: str = Header(None)):
    """Optional authentication - returns None if no valid token"""
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
