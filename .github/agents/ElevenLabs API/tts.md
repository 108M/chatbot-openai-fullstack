# Text-to-Speech (TTS)

## Endpoint

`POST /generate-audio`

Genera audio a partir de texto usando ElevenLabs TTS.

## Código del Backend

```python
from elevenlabs import VoiceSettings
from config import logger, supabase, elevenlabs_client

@router.post("/generate-audio")
async def generate_audio(request: AudioRequest, user: dict = Depends(get_current_user)):
    if not elevenlabs_client:
        raise HTTPException(status_code=503, detail="ElevenLabs API not configured")
    
    text = request.text
    voice_id = request.voice_id or "21m00Tcm4TlvDq8ikWAM"
    model_id = "eleven_multilingual_v2"
    
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
    
    # Generar audio en memoria
    audio_bytes = io.BytesIO()
    for chunk in audio_generator:
        audio_bytes.write(chunk)
    
    audio_data = audio_bytes.getvalue()
```

## VoiceSettings

| Parámetro | Valor por defecto | Descripción |
|-----------|-------------------|-------------|
| `stability` | `0.5` | Controla la variabilidad entre generaciones. Más bajo = más expresivo. |
| `similarity_boost` | `0.75` | Ajusta la similitud con la voz original. |
| `style` | `0.0` | Acentúa el estilo de la voz. |
| `use_speaker_boost` | `True` | Mejora la claridad del hablante. |

## Flujo de Guardado

1. Se genera el audio en memoria.
2. Se genera un UUID único (`upload_id`).
3. Se guarda en **Supabase** tabla `uploads` con codificación `base64`.
4. Se devuelve la URL de acceso: `/uploads/{upload_id}`.

## Ejemplo de Request

```json
{
  "text": "Hola, ¿cómo estás?",
  "voice_id": "21m00Tcm4TlvDq8ikWAM"
}
```

## Ejemplo de Response

```json
{
  "audio_url": "/uploads/audio_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "filename": "audio_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.mp3",
  "upload_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

## Voces por Defecto

Si no se especifica `voice_id`, se usa **Rachel** (`21m00Tcm4TlvDq8ikWAM`).

Consulta `voces.md` para la lista completa.
