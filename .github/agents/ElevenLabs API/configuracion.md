# Configuración de ElevenLabs

## Variables de Entorno

El proyecto requiere las siguientes variables en el archivo `.env`:

```bash
ELEVENLABS_API_KEY=your_api_key_here
ELEVENLABS_AGENT_ID=agent_xxxxxxxxxxxxxxxxxxxxxxxx
```

## Inicialización del Cliente

El cliente de ElevenLabs se inicializa en `backend/config.py`:

```python
import os
from elevenlabs.client import ElevenLabs

elevenlabs_client = None
if os.getenv("ELEVENLABS_API_KEY"):
    elevenlabs_client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))
    logger.info("ElevenLabs client initialized")
else:
    logger.warning("ELEVENLABS_API_KEY not set - ElevenLabs client disabled")
```

### Dependencias

Asegúrate de tener instalado el SDK oficial:

```bash
pip install elevenlabs
```

### Cliente Inyectado en Rutas

Las rutas que usan ElevenLabs importan el cliente desde `config`:

```python
from config import logger, supabase, elevenlabs_client
```

Si `elevenlabs_client` es `None`, los endpoints devuelven **HTTP 503** (Servicio no disponible).

## Endpoints Públicos de Configuración

El backend expone la configuración pública en `GET /public-config`:

```python
@app.get("/public-config")
async def public_config():
    return {
        "elevenlabs_agent_id": os.getenv("ELEVENLABS_AGENT_ID", ""),
        "elevenlabs_api_key": os.getenv("ELEVENLABS_API_KEY", ""),
    }
```

**Nota:** En producción, la API key expuesta aquí debe ser la **clave pública**, no la secreta.

## Modelos Soportados

| Modelo | Uso |
|--------|-----|
| `eleven_multilingual_v2` | Text-to-Speech (TTS) |
| `scribe_v2` | Speech-to-Text (STT) |
