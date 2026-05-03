# Frontend — ChatBot (Documentación técnica)

Resumen ejecutivo
- Frontend SPA en React 19 + TypeScript ejecutado con Bun.
- Provee UI, manejo de estado, subida de archivos, grabación de voz y conexión en tiempo real con el backend.
- Comunicaciones: HTTP REST para operaciones CRUD y recursos; WebSocket para chat en tiempo real y streaming.

Tecnologías clave
- Bun (runtime + bundler)
- React 19 + TypeScript
- Tailwind CSS, Radix UI
- Zustand (store central para chat)
- Supabase (auth + storage) — cliente en src/lib/supabaseClient.ts
- Cliente HTTP propio en src/lib/apiClient.ts
- WebSockets para streaming/real-time (conexión a BUN_PUBLIC_API_URL)

Estructura relevante (resumen)
- src/
  - lib/
    - apiClient.ts         — wrapper fetch con base URL (BUN_PUBLIC_API_URL) y utilidades comunes
    - supabaseClient.ts    — instancia cliente Supabase (auth + storage)
    - utils.ts
  - context/
    - AuthContext.tsx     — proveedor de autenticación y token handling
    - ChatContext.tsx     — contexto para estado de sesión de chat (conexión WS, estado de streaming)
  - store/
    - chatStore.ts        — Zustand: historial, sesión actual, flags de streaming
  - components/
    - ChatWindow.tsx      — UI principal del chat (mensajes, input)
    - VoiceRecorder.tsx   — grabación y envío de audio
    - FileUploader.tsx    — subida de PDF/TXT y previsualización
    - AudioPlayer.tsx     — reproducción de TTS recibido
    - HistorySidebar.tsx  — historial de conversaciones
  - pages/
    - ChatPage.tsx
    - LoginPage.tsx
    - RegisterPage.tsx
  - frontend.tsx / App.tsx — bootstrapping de la app y providers


Inicio rápido (local)
1. cd frontend
2. bun install
3. bun run dev
- Frontend por defecto: http://localhost:3000

Patrón de comunicación (alto nivel)
- HTTP REST:
  - Se usa para: autenticación (registro/login), operaciones de recursos (subida de archivos, historial, configuración de sistema prompt, endpoints no stream).
  - apiClient.ts construye peticiones con baseUrl desde BUN_PUBLIC_API_URL y añade headers (Authorization: Bearer <token>) cuando el usuario está autenticado.
- WebSocket:
  - Se usa para: chat en tiempo real y streaming incremental de respuestas (tokens parciales, estado de generación).
  - Conexión típica: ws(s)://{host}/ws/chat o ruta definida por backend (configurar BUN_PUBLIC_API_URL adecuadamente).
  - Lifecycle: abrir socket en mount de ChatPage/ChatContext, enviar mensaje inicial de autenticación (si aplica), manejar mensajes entrantes (parciales, end, metadata), reconexión en fallo.

Flujo de autenticación (cliente)
1. Usuario se registra/login → frontend envía POST a /auth/register o /auth/login (apiClient).
2. Backend responde con JWT y/o sesión Supabase.
3. AuthContext guarda token (preferible: memory + secure cookie; actual implementación puede usar Supabase + localStorage).
4. apiClient añade Authorization: Bearer <JWT> en peticiones que lo requieran.
5. Supabase anon key se usa para operaciones públicas en storage; operaciones con permisos usan service key en backend (no exponer en frontend).

Flujo del chat (detalle)
1. El usuario abre ChatPage → ChatContext/ChatStore inicializa estado.
2. Se abre WebSocket hacia el backend (URL construida a partir de BUN_PUBLIC_API_URL).
3. Envío de mensaje del usuario:
   - El componente de entrada crea un objeto mensaje { type: "user_message", text, metadata }.
   - Si el chat está en modo realtime: se envía por WS: socket.send(JSON.stringify(msg)).
   - Si no hay WS: se hace POST a /chat/send con payload.
4. Streaming de respuesta:
   - Backend envía paquetes parciales: { type: "partial", content: "..." } para render incremental.
   - Al finalizar: { type: "done", message: { ... } }.
5. El frontend:
   - Agrega parcial al estado local (chatStore).
   - Cuando recibe done: persiste mensaje final y actualiza historial (posible POST a /conversations).
6. Manejo de errores y reconexión:
   - Si WS cae, intentar reabrir con backoff. Si falla persistente, caer a modo REST y notificar al usuario.

Carga y procesamiento de archivos
- FileUploader permite subir PDF/TXT.
- Opciones de flujo:
  - Directo a Supabase Storage (frontend) → backend procesa (webhook o endpoint que tome archivo desde Storage).
  - Upload via backend: POST multipart/form-data a /files/upload; backend guarda y genera embeddings.
- Luego, el backend indexa embeddings en la DB y las búsquedas semánticas usan esos vectores.
- Frontend muestra estado de upload, progreso y resultados de búsqueda semántica (componentes: SemanticSearch, HistorySidebar).

TTS / STT (audio)
- Grabación: VoiceRecorder crea Blob de audio (WebAudio/MediaRecorder).
- Envío: POST a /audio/recognize o envío por WebSocket según implementación.
- Reproducción: AudioPlayer reproduce URL/Blob retornado por backend (ElevenLabs TTS proxy).
- Notas: claves de ElevenLabs no deben exponerse: llamadas TTS/STT deben pasar por backend.

Formato de mensajes y convenciones
- Headers:
  - Authorization: Bearer <JWT>
  - Content-Type: application/json (o multipart/form-data para archivos)
- WebSocket message shape (recomendado):
  - Outgoing: { type: "message", id, conversationId?, role: "user", content }
  - Incoming partial: { type: "partial", id, content }
  - Incoming final: { type: "done", id, message: { id, role, content, metadata } }
- Usar IDs únicos (UUID) en cliente para correlacionar parciales y finales.

Estado y sincronización
- chatStore (Zustand) mantiene:
  - currentConversationId
  - messages[]
  - isStreaming, isConnected (WS)
  - ui flags (recording, uploading)
- Evitar race conditions:
  - Deshabilitar input while isStreaming true (o permitir múltiples mensajes con colas).
  - Gestionar retries en peticiones críticas.

Componentes clave y responsabilidades
- AuthContext: login/logout, token refresh, proveer user info.
- ChatContext: gestionar WS, exponer sendMessage, reconnect, stream handlers.
- apiClient.ts: centraliza timeouts, reintentos básicos y manejo de errores http comunes.
- supabaseClient.ts: operaciones con storage e interacciones públicas con la base.

Testing y debugging
- Consola network: verificar WebSocket frames (Chrome DevTools → WS).
- Panel de salida/terminal: Bun dev logs.
- Endpoints REST: probar con curl/postman apuntando a BUN_PUBLIC_API_URL.
- Simular caídas WS para verificar fallback REST.

Despliegue / producción (puntos críticos)
- BUN_PUBLIC_API_URL en producción debe apuntar al backend que soporte WebSockets (Render/Railway).
- CORS: añadir dominio frontend en backend (FRONTEND_URL).
- Usar wss:// y https:// en producción.
- No exponer claves sensibles (ELEVENLABS, OPENAI) en el frontend.

Troubleshooting común
- WS no conecta: verificar URL (ws vs wss), CORs y puerto.
- Audio no reproduce: chequear CORS en recursos estáticos o rutas de streaming.
- Tokens expirados: implementar refresh o forzar logout y re-login.
- Uploads fallan: revisar límites de tamaño y configuración de Supabase Storage.

Ejemplos rápidos (peticiones)
- Login (fetch):
```javascript
// filepath: example-usage.md
// Ejemplo corto de uso del apiClient para login
const res = await apiClient.post('/auth/login', { email, password });
// apiClient añade base URL y headers automáticamente
```

- WebSocket (esqueleto):
```javascript
// filepath: example-ws.md
const ws = new WebSocket(BUN_PUBLIC_API_URL.replace(/^http/, 'ws') + '/ws/chat');
ws.onopen = () => ws.send(JSON.stringify({ type: 'auth', token: userJwt }));
ws.onmessage = (evt) => {
  const msg = JSON.parse(evt.data);
  // manejar partial/done/error
};
```

