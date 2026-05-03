"""
Audio generation and transcription endpoints
"""
import uuid
import base64
import io
from typing import Optional
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from elevenlabs import VoiceSettings
from config import logger, supabase, elevenlabs_client
from auth import get_current_user
from models import AudioRequest, TranscriptionResponse

router = APIRouter()

# Audio directory
audio_dir = Path("audio_files")
audio_dir.mkdir(exist_ok=True)


@router.post("/generate-audio")
async def generate_audio(request: AudioRequest, user: dict = Depends(get_current_user)):
    """Generate audio from text using ElevenLabs TTS"""
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


@router.post("/transcribe-audio")
async def transcribe_audio(
    file: UploadFile = File(...),
    language_code: Optional[str] = None,
    user: dict = Depends(get_current_user)
) -> TranscriptionResponse:
    """Transcribe audio to text using ElevenLabs STT"""
    if not elevenlabs_client:
        raise HTTPException(status_code=503, detail="ElevenLabs API not configured")
    
    try:
        # Read audio file
        audio_bytes = await file.read()
        audio_data = io.BytesIO(audio_bytes)
        # Save a debug copy to disk to inspect problematic uploads in production
        try:
            debug_filename = f"debug_upload_{uuid.uuid4()}.webm"
            debug_path = audio_dir / debug_filename
            with open(debug_path, "wb") as f:
                f.write(audio_bytes)
            logger.info("Saved debug audio to %s", debug_path)
        except Exception as _e:
            logger.warning("Could not save debug audio: %s", _e)
        
        # Transcribe using ElevenLabs
        try:
            transcription = elevenlabs_client.speech_to_text.convert(
                file=audio_data,
                model_id="scribe_v2",
                tag_audio_events=False,  # Disable for cleaner text
                language_code=language_code,  # None = auto-detect
                diarize=False,  # Disable speaker identification for simplicity
            )
        except Exception as e_inner:
            logger.exception("ElevenLabs STT call failed")
            raise
        
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
        logger.exception("STT error caught in endpoint")
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")


@router.get("/audio/{filename}")
async def get_audio(filename: str):
    """Get audio file by filename"""
    file_path = audio_dir / filename
    if file_path.exists():
        return FileResponse(
            path=file_path,
            media_type="audio/mpeg",
            filename=filename
        )
    raise HTTPException(status_code=404, detail="Audio file not found")


@router.get("/voices")
async def get_voices(user: dict = Depends(get_current_user)):
    """Get available ElevenLabs voices"""
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


@router.get("/debug-uploads/{filename}")
async def get_debug_upload(filename: str, user: dict = Depends(get_current_user)):
    """Download a saved debug upload (for inspecting failed uploads).

    Files are saved in the `audio_files/` directory with names like
    `debug_upload_<uuid>.webm` when an upload is received.
    """
    file_path = audio_dir / filename
    if file_path.exists():
        return FileResponse(path=file_path, media_type="audio/webm", filename=filename)
    raise HTTPException(status_code=404, detail="Debug file not found")
