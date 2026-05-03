# Voces de ElevenLabs

## Voces Disponibles (Hardcoded)

El endpoint `GET /voices` devuelve una lista predefinida de voces populares:

| ID | Nombre |
|----|--------|
| `21m00Tcm4TlvDq8ikWAM` | Rachel |
| `AZnzlk1XvdvUeBnXmlld` | Domi |
| `EXAVITQu4vr4xnSDxMaL` | Bella |
| `ErXwobaYiN019PkySvjV` | Antoni |
| `MF3mGyEYCl7XYWbV9V6O` | Elli |
| `TxGEqnHWrfWFTfGW9XjX` | Josh |
| `VR6AewLTigWG4xSOukaG` | Arnold |
| `pNInz6obpgDQGcFmaJgB` | Adam |
| `yoZ06aMxZJJ28mfd3POQ` | Sam |

## Uso en TTS

Para usar una voz específica, pásala en el `AudioRequest`:

```json
{
  "text": "Hola mundo",
  "voice_id": "AZnzlk1XvdvUeBnXmlld"
}
```

Si no se especifica, se usa **Rachel** por defecto.

## VoiceSettings

La generación de audio utiliza la clase `VoiceSettings` del SDK:

```python
from elevenlabs import VoiceSettings

voice_settings = VoiceSettings(
    stability=0.5,
    similarity_boost=0.75,
    style=0.0,
    use_speaker_boost=True
)
```

### Parámetros

| Parámetro | Rango | Descripción |
|-----------|-------|-------------|
| `stability` | `0.0` - `1.0` | Controla la consistencia de la voz. Valores bajos generan más variabilidad y expresividad. |
| `similarity_boost` | `0.0` - `1.0` | Aumenta la similitud con la voz original a costa de algo de estabilidad. |
| `style` | `0.0` - `1.0` | Acentúa el estilo de entonación de la voz. |
| `use_speaker_boost` | `True`/`False` | Mejora la claridad y calidad general del hablante. |

## Recomendaciones

- Para contenido formal o narrativo, usa `stability` alto (`0.7` - `0.9`).
- Para contenido conversacional o dinámico, usa `stability` bajo (`0.3` - `0.5`).
- `similarity_boost` en `0.75` es un buen punto medio para la mayoría de casos.
- Puedes obtener más voces directamente desde el dashboard de ElevenLabs.
