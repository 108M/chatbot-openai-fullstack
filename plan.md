# Plan: Full-Stack Bun React Chatbot con Supabase

**TL;DR:** Implementaremos un chatbot funcional con autenticación Supabase, historial persistente, análisis de archivos (PDF/TXT), síntesis de voz, y chat en tiempo real. La arquitectura tendrá 3 capas: frontend Bun+React conectado vía WebSocket/HTTP al backend FastAPI, que a su vez persiste en Supabase PostgreSQL con RLS. El flujo será: (1) Supabase setup + autenticación, (2) componentes UI del frontend, (3) integración WebSocket + endpoints para chat/archivos/TTS, (4) historial visual.

**Decisions**
- Autenticación: Supabase Auth (email/password), con RLS en todas las tablas
- Base de datos: Postgres en Supabase con seguimiento de sesiones y mensajes por usuario
- Historial: Persistente en BD, cargado al iniciar sesión
- Upload de archivos: Validación frontend + procesamiento en backend con OpenAI Files API
- TTS: A través del backend (nunca exponer keys en cliente)

---

## Steps

### **FASE 1: Base de datos y autenticación (Supabase)**

1. **Crear proyecto Supabase** (o usar existente)
   - Configurar variables de entorno en backend: `SUPABASE_URL`, `SUPABASE_KEY`

2. **Crear tablas con RLS en Supabase** (en SQL editor):
   - `users` (meta del usuario, vinculada a auth.users de Supabase)
   - `sessions` (unique session_id por usuario, para agrupar conversaciones)
   - `messages` (historial: user_id, session_id, role, content, timestamp)
   - `uploads` (archivos: user_id, session_id, filename, file_type, size, análisis resultado)
   - Relaciones: users ← sessions ← messages; users ← uploads

3. **Configurar RLS (Row Level Security)**
   - Usuarios solo ven sus propios datos (WHERE user_id = auth.uid())
   - Sesiones y mensajes igualmente restringidos

4. **Actualizar backend** (main.py):
   - Integrar cliente Supabase (`supabase-py`)
   - Reemplazar historial en-memoria con queries a BD
   - Persistir mensajes post-respuesta: `INSERT INTO messages`
   - Crear session automáticamente si no existe

### **FASE 2: Frontend setup y componentes base**

5. **Instalar dependencias faltantes en frontend** (package.json):
   - `@supabase/supabase-js` (cliente auth + realtime)
   - `ws` (cliente WebSocket, o usar fetch para SSE)
   - `react-hook-form` (formularios login/register)
   - `zustand` (state management: usuario actual, sesión, mensajes)
   - `date-fns` (formatear timestamps)

6. **Crear estructura de carpetas**:
   - `src/contexts/AuthContext.tsx` (Supabase auth provider)
   - `src/contexts/ChatContext.tsx` (estado global: mensajes, sesión)
   - `src/pages/LoginPage.tsx` (formulario login)
   - `src/pages/RegisterPage.tsx` (formulario registro)
   - `src/pages/ChatPage.tsx` (pantalla principal del chatbot)
   - `src/components/ChatWindow.tsx` (conversación + scroll)
   - `src/components/FileUploader.tsx` (drag-drop imagen/PDF)
   - `src/components/AudioPlayer.tsx` (reproductor TTS)
   - `src/components/HistorySidebar.tsx` (lista de sesiones)
   - `src/hooks/useChat.ts` (custom hook WebSocket)
   - `src/hooks/useAuth.ts` (custom hook autenticación)
   - `src/lib/supabaseClient.ts` (cliente Supabase configurado)
   - `src/lib/apiClient.ts` (helper para peticiones al backend)

7. **Actualizar App.tsx**:
   - Routing básico: `LoginPage` → `ChatPage` (protegida si no autenticado)
   - Usar `AuthContext` para compartir usuario
   - Navegar a login si sesión expira

### **FASE 3: Autenticación en UI**

8. **Implementar LoginPage**:
   - Formulario: email + contraseña
   - Llamar a `supabase.auth.signInWithPassword()`
   - Error handling (usuario no existe, contraseña inválida)
   - Link "Crear cuenta" → RegisterPage

9. **Implementar RegisterPage**:
   - Formulario: email + contraseña + confirmación
   - Validación frontend (email válido, password length)
   - Llamar a `supabase.auth.signUp()`
   - Auto-login o redirigir a login
   - Crear entrada en tabla `users` (trigger o manual post-signup)

10. **Crear AuthContext** (src/contexts/AuthContext.tsx):
    - `useEffect`: Escuchar `supabase.auth.onAuthStateChange`
    - Guardar usuario actual en estado
    - Logout: `supabase.auth.signOut()`
    - Proteger rutas (redirect no autenticados)

### **FASE 4: UI del Chatbot (componentes)**

11. **Implementar ChatWindow**:
    - Mostrar array de mensajes (user/assistant)
    - Scroll automático al fondo (useEffect + ref)
    - Input de texto con botón enviar
    - Estados: loading (puntos animados), error (alert rojo)
    - Formato: timestamp, avatar usuario/IA

12. **Implementar FileUploader**:
    - Drag-drop zone (Tailwind styling)
    - Input file oculto con `<input type="file" accept=".txt,.pdf,.png,.jpg">`
    - Preview de imágenes pequeñas
    - Botón "Analizar" que llama al backend
    - Mostrar resultado (resumen, descripción) en ChatWindow

13. **Implementar AudioPlayer**:
    - Reproductor HTML5 `<audio>`
    - Botón descargar MP3
    - Selector de voces (dropdown ElevenLabs)
    - Botón "Generar audio" desde texto seleccionado

14. **Implementar HistorySidebar**:
    - Listar sesiones del usuario (query: `SELECT * FROM sessions WHERE user_id = ?`)
    - Click para cargar conversación (UPDATE `current_session_id`)
    - Botón "Nueva conversación" (INSERT sesión, reset state)
    - Botón eliminar sesión (DELETE + RLS valida)

### **FASE 5: Integración WebSocket y estado global**

15. **Crear ChatContext** (zustand o React Context):
    - `messages: Message[]` (array de chat actual)
    - `currentSession: Session`
    - `isLoading: boolean`
    - `error: string | null`
    - Acciones: `addMessage()`, `setSession()`, `clearError()`

16. **Implementar useChat hook**:
    - Conectar WebSocket: `const ws = new WebSocket('ws://localhost:8000/ws/chat')`
    - Enviar: `ws.send(JSON.stringify({ message, session_id }))`
    - Recibir stream: `ws.onmessage = (ev) => addMessage(ev.data)`
    - Manejar desconexiones: reconectar automático
    - Usar ChatContext para persistir estado

17. **Conectar ChatWindow a WebSocket**:
    - OnSubmit input → `sendMessage(text)`
    - Mostrar respuesta en tiempo real desde stream
    - Guardar en array local después de completar

### **FASE 6: Endpoints de análisis de archivos**

18. **Frontend → FileUploader**:
    - POST `/analyze-image` (multipart FormData con imagen)
    - POST `/analyze-file` (multipart FormData con PDF/TXT)
    - Mostrar resultado debajo del upload
    - Guardar respuesta en historial (INSERT uploads)

19. **Backend → main.py**:
    - Validar que user está autenticado (JWT token)
    - Procesar con OpenAI API
    - INSERT en tabla `uploads` (Supabase)
    - Retornar resultado

### **FASE 7: Text-to-Speech**

20. **Frontend → AudioPlayer**:
    - Input textarea con texto a convertir
    - Selector voice (dropdown con voice_ids de ElevenLabs)
    - Botón "Generate" → POST `/generate-audio`
    - Mostrar reproductor HTML5 cuando responda

21. **Backend → main.py**:
    - Recibir `{text, voice_id, user_id}`
    - Llamar ElevenLabs API
    - Guardar MP3 en Supabase Storage (o local con auth)
    - Retornar URL accesible

### **FASE 8: Historial visual y sesiones**

22. **HistorySidebar funcional**:
    - Cargar sesiones on-mount: `SELECT * FROM sessions WHERE user_id = ?`
    - Click sesión → cargar mensajes: `SELECT * FROM messages WHERE session_id = ?`
    - "Nueva conversación" → INSERT sesión, reset UI

23. **Actualizar ChatContext**:
    - `loadSession(sessionId)` → fetch mensajes + render
    - `createSession()` → new session_id, empty messages

### **FASE 9: Seguridad y validación**

24. **Frontend validaciones**:
    - Email regex en formularios
    - Tamaño máx archivos (50MB)
    - Extensiones permitidas (.txt, .pdf, .png, .jpg)
    - Mensajes no vacíos

25. **Backend validaciones y CORS**:
    - Con respecto a main.py existente: añadir verificación JWT (Supabase)
    - Restringir CORS a `http://localhost:3000`
    - Rate limiting por user_id
    - Validar session_id pertenece al usuario autenticado

### **FASE 10: Pulido y pruebas**

26. **Testing manual**:
    - Flujo completo: register → login → chat → upload → TTS → history
    - WebSocket reconexión en caso de desconexión
    - RLS: intenta acceder a datos de otro usuario (debe fallar)
    - Error UI: mensaje muy largo, archivo corrupto, api down

27. **Optimizaciones**:
    - Lazy load componentes (React.lazy)
    - Memoize ChatWindow si lista muy grande (React.memo)
    - Compresión de imágenes antes enviar
    - Caching de sesiones recientes

---

## Verification

- ✅ **Autenticación:** Registrarse, login/logout, sesión persiste en refresh
- ✅ **Chat:** Enviar mensaje, recibir respuesta en tiempo real vía WebSocket, historial guardado en BD
- ✅ **Archivos:** Upload imagen/PDF, análisis visible en chat
- ✅ **TTS:** Generar audio, descargar, reproducir
- ✅ **Historial:** Ver sesiones anteriores, cargar conversaciones
- ✅ **RLS:** Usuario A no ve datos de Usuario B
- ✅ **Error handling:** Mensajes claros para fallos (red, auth, file size)
- ✅ Command: `bun install` + `bun run dev` (frontend), `python -m uvicorn main:app --reload` (backend)
