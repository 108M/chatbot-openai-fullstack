# Speech-to-Text (STT)

## Endpoint

`POST /transcribe-audio`

Transcribe un archivo de audio a texto usando ElevenLabs STT (modelo `scribe_v2`).

## Código del Backend

```python
@router.post("/transcribe-audio")
async def transcribe_audio(
    file: UploadFile = File(...),
    language_code: Optional[str] = None,
    user: dict = Depends(get_current_user)
) -> TranscriptionResponse:
    if not elevenlabs_client:
        raise HTTPException(status_code=503, detail="ElevenLabs API not configured")
    
    # Leer archivo de audio
    audio_bytes = await file.read()
    audio_data = io.BytesIO(audio_bytes)
    
    # Transcribir usando ElevenLabs
    transcription = elevenlabs_client.speech_to_text.convert(
        file=audio_data,
        model_id="scribe_v2",
        tag_audio_events=False,
        language_code=language_code,  # None = auto-detect
        diarize=False,
    )
    
    transcribed_text = transcription.text if hasattr(transcription, 'text') else str(transcription)
    detected_language = getattr(transcription, 'language', language_code)
```

## Parámetros de Transcripción

| Parámetro | Valor por defecto | Descripción |
|-----------|-------------------|-------------|
| `model_id` | `"scribe_v2"` | Modelo de transcripción. |
| `tag_audio_events` | `False` | Si es `True`, incluye etiquetas como `[music]` o `[laughter]`. |
| `language_code` | `None` | Código de idioma (ej: `"es"`, `"en"`). `None` = detección automática. |
| `diarize` | `False` | Si es `True`, identifica diferentes hablantes. |

## Response

```python
class TranscriptionResponse(BaseModel):
    text: str
    language: Optional[str]
    duration: float
```

## Cálculo de Duración

La duración es una estimación aproximada:

```python
word_count = len(transcribed_text.split())
duration_minutes = word_count / 150.0
```

(Asume 150 palabras por minuto).

## Debug de Subidas

En caso de error, se guarda una copia del archivo subido en `audio_files/debug_upload_<uuid>.webm` para inspección.

## Ejemplo de Response

```json
{
  "text": "Hola, ¿cómo estás? Este es un mensaje de prueba.",
  "language": "es",
  "duration": 0.2
}
```

## Notas

- El archivo se recibe como `UploadFile` (multipart/form-data).
- Formatos soportados: dependen del modelo `scribe_v2`, generalmente `mp3`, `wav`, `webm`, `m4a`.
- Si la transcripción falla, se devuelve **HTTP 500** con el mensaje de error.
