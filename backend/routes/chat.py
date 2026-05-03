"""
WebSocket chat endpoint for real-time streaming
"""
import jwt
import uuid
import base64
import io
from fastapi import WebSocket
from elevenlabs import VoiceSettings
from scipy.spatial.distance import cosine
from config import logger, supabase, openai_client, elevenlabs_client
from database import (
    get_or_create_session, 
    get_session_messages, 
    save_message, 
    update_session_title,
    generate_embedding,
    convert_embedding
)


async def websocket_chat(websocket: WebSocket):
    """WebSocket endpoint for streaming chat with voice support"""
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
