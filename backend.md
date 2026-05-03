# Backend — ChatBot (Documentación técnica)

Resumen ejecutivo
- Backend construido con FastAPI (Python 3.11+). Provee REST + WebSocket para chat en tiempo real, gestión de sesiones, subida y procesamiento de documentos, análisis (embeddings / search), y audio (STT/TTS).
- Autenticación basada en JWT y/o integración con Supabase.
- Diseñado para I/O : endpoints async y uso de background tasks (indexado, generación de embeddings, llamadas a OpenAI / ElevenLabs).

Estructura principal
- main.py — arranque de la app (uvicorn), configuración CORS, routers y middlewares.
- auth.py — utilidades de auth / generación y verificación JWT.
- config.py — variables de entorno y configuración.
- database.py — conexión y modelos DB (sync/async según implementación).
- routes/ — endpoints agrupados:
  - routes/auth (login/registro) — en routes/sessions.py o similar
  - routes/chat.py — WS y endpoints relacionados con conversaciones
  - routes/audio.py — STT / TTS proxy endpoints
  - routes/documents.py — upload / list / delete / parse
  - routes/analysis.py — embeddings / semantic search
  - routes/system_prompts.py — CRUD para prompts del sistema

Autenticación y seguridad
- Flow típico:
  1. POST /auth/register o /auth/login → devuelve JWT + user info.
  2. Cliente guarda token (frontend) y lo envía en header:
     Authorization: Bearer <JWT>
- Endpoints protegidos verifican JWT en dependencia (FastAPI Depends).
- Recomendación: tokens cortos + refresh tokens; todas las claves sensibles en variables de entorno del servidor.

Contrato de la API (endpoints importantes)
Nota: rutas exactas pueden variar ligeramente según implementación. A continuación se documentan convenciones y ejemplos de uso.

1) Auth / Sesiones
- POST /auth/register
  - Descripción: Crear usuario.
  - Payload: { "email": "...", "password": "...", "name"?: "..." }
  - Respuesta: 201 { "user": { id, email, name }, "access_token": "..." }
  - Async: típicamente async

- POST /auth/login
  - Descripción: Login y obtención de JWT.
  - Payload: { "email": "...", "password": "..." }
  - Respuesta: 200 { "access_token": "...", "expires_in": 3600, "user": {...} }

- POST /auth/refresh (si existe)
  - Uso para renovar tokens (si se implementa refresh token).

2) Chat (REST + WebSocket)
- WebSocket: /ws/chat  (o /chat/ws)
  - Descripción: streaming bidireccional para envío de mensajes y recepción incremental de tokens.
  - Autenticación: enviar mensaje inicial con token (ej. { type: "auth", token }) o usar query param ?token=
  - Mensajes salientes (cliente → servidor):
    - { type: "message", id: "<uuid>", conversation_id?: "<id>", role: "user", content: "..." }
    - { type: "action", action: "stop" | "retry" | ... }
  - Mensajes entrantes (servidor → cliente):
    - Parcial: { type: "partial", id, content: "..." }
    - Final: { type: "done", id, message: { id, role, content, metadata } }
    - Error: { type: "error", id?, message: "..." }
  - Comportamiento: conexión async, permite streaming incremental. Reconexión y backoff deben manejarse en el cliente.

- POST /chat/send
  - Descripción: envío de mensaje sin WebSocket (sync/async request-response).
  - Payload: { "conversation_id"?: "...", "content": "...", "metadata"?: {} }
  - Respuesta: 200 { message: { id, role, content, metadata } } — puede bloquear hasta respuesta completa (no streaming).

3) Documents / Files
- POST /files/upload
  - Descripción: subir PDF/TXT (multipart/form-data).
  - Form-data: file: <binary>, conversation_id?: string
  - Respuesta: 201 { file_id, filename, url, status }
  - Implementación: suele ser async; puede lanzar background task para parseo e indexado.

- GET /files/:id
  - Descargar/metadata del archivo.

- DELETE /files/:id
  - Borrar archivo y/o desindexar.

Notas:
- Alternativa: subir directamente a Supabase Storage desde frontend; backend recibe referencia y procesa archivo (suscripción o endpoint POST /files/process).

4) Analysis / Embeddings / Semantic Search
- POST /analysis/embeddings
  - Payload: { "text": "...", "model"?: "text-embedding-..." }
  - Respuesta: { embeddings: [number,...] }
  - Async: llamada a OpenAI; normalmente async.

- POST /analysis/semantic-search
  - Payload: { "query": "...", "top_k"?: 5, "conversation_id"?: "..." }
  - Respuesta: { results: [ { id, score, snippet, source } ] }

5) Audio (STT / TTS)
- POST /audio/recognize
  - Descripción: enviar audio blob para transcripción.
  - Content-Type: multipart/form-data (file: audio/webm | wav)
  - Respuesta: 200 { text: "transcribed text", language: "es" }
  - Async: I/O con ElevenLabs / OpenAI — se recomienda endpoint async o background task.

- POST /audio/tts
  - Descripción: texto → voz (proxy a ElevenLabs).
  - Payload: { "text": "...", "voice"?: "alloy", "format"?: "mp3" }
  - Respuesta: 200 { url: "/audio/generated/<id>.mp3" } o stream binary
  - Nota: No exponer ELEVENLABS_API_KEY al frontend.

6) System Prompts / Config
- CRUD endpoints para prompts del sistema (GET/POST/PUT/DELETE /system_prompts)
  - Uso: gestión de prompts por usuario o por organización.
  - Protegidos por JWT.

Tipos de peticiones y asincronía
- FastAPI permite definir endpoints sync (def func) y async (async def).
- Reglas y recomendaciones:
  - I/O-bound (HTTP a OpenAI, DB async drivers, file I/O, external APIs): usar async def.
  - CPU-bound (procesamiento pesado local): ejecutar en background task o mover a worker (Celery / RQ) para no bloquear event loop.
  - WebSocket handlers siempre son async.
  - Subida de archivos (multipart): async handlers con StreamingResponse/FileResponse cuando sea necesario.
- Background tasks:
  - Uso típico: indexado de documentos, generación de embeddings, tareas post-upload.
  - FastAPI BackgroundTasks o system de colas para tareas duraderas.

Cabeceras y formatos
- Autorización:
  - Authorization: Bearer <JWT>
- Content-Type:
  - application/json para JSON
  - multipart/form-data para uploads
  - application/octet-stream para blobs binarios (en algunos endpoints)
- Respuestas de error:
  - 400 Bad Request — validación de input
  - 401 Unauthorized — token inválido/expirado
  - 403 Forbidden — permiso insuficiente
  - 404 Not Found — recurso inexistente
  - 500 Internal Server Error — fallo del servidor / terceros

Ejemplos (curl)

- Login
```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```

- Envío de mensaje via REST
```bash
curl -X POST "http://localhost:8000/chat/send" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"conversation_id":"abc123","content":"Hola, me ayudas con esto?"}'
```

- Subida de archivo
```bash
curl -X POST "http://localhost:8000/files/upload" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@./document.pdf"
```

- Conexión WebSocket (esqueleto JS)
```javascript
const ws = new WebSocket("wss://api.example.com/ws/chat?token=" + token);
ws.onopen = () => ws.send(JSON.stringify({ type: "message", id: "id-1", content: "Hola" }));
ws.onmessage = (evt) => { const data = JSON.parse(evt.data); /* manejar partial/done */ }
```

Consideraciones de rendimiento y escalabilidad
- WebSocket -> mantener estado por conexión implica sticky sessions o un layer de coordinación (Redis) si hay múltiples instancias.
- Llamadas a OpenAI y ElevenLabs: respetar límites de rate; implementar retry exponential backoff.
- Indexado y búsquedas vectoriales: usar servicio de vectores (e.g., Supabase vector, Pinecone) y delegar trabajo pesado a workers.

Logging y observabilidad
- Registrar peticiones importantes, errores de terceros y duración de llamadas (OpenAI).
- Integrar Sentry / Prometheus para métricas y errores críticos.
- Exponer /metrics si se usa Prometheus.

Testing y desarrollo local
- Ejecutar:
  - Crear virtualenv, instalar requirements.txt
  - cp .env.example .env y rellenar claves
  - uvicorn main:app --reload --host 0.0.0.0 --port 8000
- Testear endpoints con curl / Postman y WebSocket con wscat o navegador.
- Mockear proveedores externos en tests unitarios (OpenAI, ElevenLabs, Supabase).

Errores comunes y troubleshooting
- 401 en WS: token no enviado o expirado → verificar método de autenticación (query param o mensaje inicial).
- WS no conecta en producción: revisar WSS y certificados, proxy (NGINX) o load balancer que no soporte WebSocket correctamente.
- Timeouts en llamadas a OpenAI: aumentar timeouts y usar retries; verificar límites de la API.
- Uploads fallan con 413: revisar límites de tamaño en servidor/proxy y Supabase.


Dónde revisar el código
- main.py — inicialización de la app y routers.
- routes/*.py — implementación de endpoints (chat.py, audio.py, documents.py, analysis.py, sessions.py, system_prompts.py).
- auth.py — lógica JWT.
- database.py / models.py — modelos y accesos a BD.

