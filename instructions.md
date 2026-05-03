# Development Rules - Chatbot App Markel

## Project Context

Full-stack conversational AI application. Frontend is a Single Page Application (SPA) deployed on Vercel. Backend is a Python FastAPI service deployed on Render/Railway. Supabase acts as the BaaS (Auth, PostgreSQL, Storage). The app supports real-time chat with OpenAI GPT-4o-mini streaming, voice synthesis (TTS) and transcription (STT) via ElevenLabs, image/PDF/TXT analysis, semantic document search via embeddings, and an ElevenLabs ConvAI Agent widget.

**Architecture:** SPA (Vercel) ↔ FastAPI (Render) ↔ Supabase (BaaS)

---

## Tech Stack

### Frontend
- **Runtime & Bundler:** Bun (NOT Node.js). Build script is `frontend/build.ts` using `Bun.build()`.
- **Framework:** React 19.2.4 + TypeScript (ESNext, JSX transform `react-jsx`).
- **Styling:** Tailwind CSS v4 (`@theme inline` in CSS, NO `tailwind.config.js`). `tw-animate-css` for animations.
- **UI Components:** shadcn/ui patterns (Radix UI primitives + `class-variance-authority` + `clsx`/`tailwind-merge`). Components live in `frontend/src/components/ui/`.
- **State Management:** Zustand 5.x for global chat state. React Context (`AuthContext`) for Supabase Auth state ONLY.
- **Icons:** Lucide React.
- **Notifications:** Sonner (`<Toaster position="top-right" richColors />`).
- **Theming:** `next-themes` (`ThemeProvider` with `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`).

### Backend
- **Framework:** FastAPI 0.104+ (Python 3.12).
- **Server:** Uvicorn[standard].
- **Auth:** PyJWT (decodes Supabase JWT tokens).
- **AI/ML:** OpenAI Python SDK (GPT-4o-mini, text-embedding-3-small), ElevenLabs SDK (TTS/STT).
- **Docs:** pdfplumber, python-multipart.
- **Math:** scipy/numpy (cosine similarity for embeddings).
- **Database:** supabase-py (PostgREST client).
- **WebSockets:** `websockets>=12.0` (handled natively by FastAPI/Uvicorn).

### Infrastructure
- **Frontend Hosting:** Vercel (static build from `frontend/public`).
- **Backend Hosting:** Render/Railway (Uvicorn binds to `0.0.0.0:$PORT`).
- **Database & Auth:** Supabase (PostgreSQL + Row Level Security + Auth).

---

## Frontend Rules

### General Architecture
- The app is a SPA with view-level routing managed in `App.tsx` (`AuthView`: login/register; `MainView`: chat/agent). NO React Router.
- Entry point: `frontend/src/frontend.tsx` (mounts React). Dev server: `frontend/src/index.ts` (Bun.serve with HMR).
- Path alias `@/*` maps to `frontend/src/*`. Use it for ALL imports. The build uses a custom `pathAliasPlugin.ts` to resolve this in `Bun.build()`.

### Component Structure
- **Pages:** `frontend/src/pages/` (ChatPage, AgentPage, LoginPage, RegisterPage). These are top-level view containers.
- **Components:** `frontend/src/components/` for feature components. `frontend/src/components/ui/` for design-system primitives.
- **UI Primitives:** Follow the existing shadcn/ui pattern EXACTLY:
  - Use `cva` (`class-variance-authority`) for variant-driven components (see `button.tsx`).
  - Use `cn()` from `@/lib/utils` (wraps `clsx` + `tailwind-merge`) for ALL conditional class merging.
  - Use Radix UI primitives for accessibility (DropdownMenu, Label, Select, Slot).
  - Export compound components (e.g., `Card`, `CardHeader`, `CardContent`) as named exports.

### Styling (Tailwind v4)
- Tailwind v4 is configured via CSS, NOT JS. ALL theme tokens live in `frontend/styles/globals.css` inside `@theme inline`.
- Color tokens use `oklch()` and are bound to CSS variables (`--background`, `--primary`, etc.).
- Dark mode is class-based (`.dark`). The `ThemeProvider` toggles this class on `<html>`.
- Custom animations are defined in `globals.css` (e.g., `fadeInUp`, `scaleIn`). Use the provided utility classes (`animate-in-up`, `transition-smooth`) for UI motion.
- ALWAYS respect `prefers-reduced-motion`.

### State Management
- **Zustand (`frontend/src/store/chatStore.ts`):** owns the global chat state (`messages`, `sessions`, `currentSession`, `isLoading`, `error`).
  - Async actions (loadSessions, loadSession, createSession, deleteSession) fetch the REST API and update the store.
  - `loadSession` performs a CRITICAL data transformation: backend returns `{ id: 0|1, msg, date }`; frontend stores `{ role: 'user'|'assistant', content, created_at }`.
- **React Context (`frontend/src/context/AuthContext.tsx`):** owns Supabase Auth ONLY (`user`, `session`, `signIn`, `signUp`, `signOut`).
  - NEVER mix auth state into Zustand.
  - `useAuth()` is a thin wrapper around `useAuthContext()`.

### Communication with Backend
- **REST API:** `frontend/src/lib/apiClient.ts` is the single source of truth for HTTP calls.
  - ALWAYS attach `Authorization: Bearer <supabase_access_token>` header. Retrieve it via `supabase.auth.getSession()`.
  - Use `getAuthHeaders()` for JSON requests and `getAuthHeadersMultipart()` for FormData (omits `Content-Type` to let the browser set the boundary).
  - Base URL comes from `process.env.BUN_PUBLIC_API_URL` (fallback `http://localhost:8000`).
- **WebSocket:** `frontend/src/hooks/useChat.ts` manages the WebSocket connection to `/ws/chat`.
  - WS URL is derived from API_URL: replace `https://` → `wss://`, `http://` → `ws://`. Local fallback: `ws://localhost:8000`.
  - The hook handles automatic reconnection every 3000ms.
  - Message protocol over WS:
    - Send: `{ message, session_id, token, enable_voice }`
    - Receive types: `session`, `token` (streaming delta), `audio` (URL), `done`, `error`.
  - On `token` type, the hook appends content to the last assistant message (optimistic UI pattern).

### Environment Variables (Frontend)
- Variables are injected at BUILD time via `Bun.build()` `define` in `build.ts`.
- Allowed vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `BUN_PUBLIC_API_URL`, `OPENAI_API_KEY`, `ELEVENLABS_API_KEY`.
- In code, access them as `process.env.VAR_NAME`. The build replaces these literals.
- NEVER commit real keys. Use `frontend/.env.example` as reference.

---

## Backend Rules

### Project Structure
- `backend/main.py` — App factory. Mounts CORS, routers, and the WebSocket endpoint.
- `backend/routes/` — One router per domain:
  - `chat.py` — WebSocket `/ws/chat` handler.
  - `sessions.py` — CRUD for chat sessions.
  - `audio.py` — TTS (`/generate-audio`) and STT (`/transcribe-audio`).
  - `analysis.py` — Image (`/analyze-image`), file (`/analyze-file`), and multi-file (`/analyze-multiple`) analysis.
  - `documents.py` — Semantic document storage and search (`/add-document`, `/search-documents`, `/documents`, `/documents-for-chat`).
  - `system_prompts.py` — Per-session system prompt overrides.
  - `elevenlabs_agent.py` — Webhook receiver for ElevenLabs ConvAI Agent events.
- `backend/models.py` — ALL Pydantic request/response models. ALWAYS validate inputs with Pydantic.
- `backend/database.py` — Supabase data access layer. Contains embedding generation (`text-embedding-3-small`) and cosine similarity helpers.
- `backend/config.py` — Client initialization (OpenAI, ElevenLabs, Supabase) and logger setup. Reads `.env`.
- `backend/auth.py` — JWT dependency. Extracts `sub` from Supabase access token.

### FastAPI Routing
- Use `APIRouter` per module. Register routers in `main.py` with `app.include_router(router, tags=[...])`.
- Tag names are used for OpenAPI docs grouping. Keep them consistent.
- Public endpoints (no auth): `GET /`, `GET /health`, `GET /public-config`, `GET /uploads/{upload_id}` (optional auth), `POST /webhook/elevenlabs`.
- ALL other endpoints MUST use `user: dict = Depends(get_current_user)`.

### Pydantic Validation
- Define request models in `models.py`. Use `Optional[str] = None` for optional fields.
- For form-data endpoints (file uploads), use `UploadFile = File(...)` and `Form(...)` directly in route signatures. Pydantic models are used primarily for JSON bodies.
- Return typed responses where possible (e.g., `-> TranscriptionResponse`).

### WebSocket (`/ws/chat`)
- Implemented as an async function `websocket_chat(websocket: WebSocket)` in `routes/chat.py`, mounted in `main.py` via `app.websocket("/ws/chat")(websocket_chat)`.
- Protocol:
  1. Client sends JSON: `{ message, session_id, token, enable_voice }`.
  2. Server decodes JWT (development mode uses `verify_signature=False`), extracts `user_id`.
  3. Server gets/creates session, loads history from `sessions.messages` (JSONB array).
  4. Server fetches relevant documents via embeddings + cosine similarity (threshold `> 0.3`, top 3).
  5. Server injects system prompt + document context as a `system` message in history.
  6. Server streams OpenAI GPT-4o-mini response. Each delta is sent as `{"type": "token", "content": delta}`.
  7. If `enable_voice=true`, server generates audio via ElevenLabs (`eleven_multilingual_v2`, voice `21m00Tcm4TlvDq8ikWAM`), base64-encodes it, stores in `uploads` table, and sends `{"type": "audio", "audio_url": "/uploads/{id}"}`.
  8. Final message: `{"type": "done", "audio_url": ...}`.
- Messages are saved to DB DURING the conversation (`save_message` for user message before streaming, assistant message after streaming).
- Session title auto-updates on first message (truncated to 50 chars).

### Authentication
- `get_current_user` dependency extracts the Bearer token, decodes the JWT, and returns `{"id": user_id, "email": email}`.
- In development, JWT signature verification is DISABLED (`verify_signature=False`). This is intentional for local dev but MUST be fixed for production.
- The backend uses `SUPABASE_SERVICE_KEY` (service role) to access Supabase. The frontend uses the anon key.

### Error Handling
- Use `HTTPException` with appropriate status codes (400, 401, 403, 404, 500, 503).
- Log errors with the configured logger (`config.logger`).
- In WebSocket handlers, wrap sends in `try/except` to avoid crashing on disconnected clients.

---

## Database & AI Integration

### Supabase Rules
- **Client (Frontend):** Use `@supabase/supabase-js` with `createClient(supabaseUrl, supabaseAnonKey)`. Enable `autoRefreshToken`, `persistSession`, `detectSessionInUrl`.
- **Client (Backend):** Use `supabase-py` with `SUPABASE_SERVICE_KEY` for full admin access.
- **Tables (inferred schema):**
  - `sessions` — `id` (uuid), `user_id` (uuid), `title` (text), `messages` (jsonb), `created_at`, `updated_at`.
    - `messages` JSONB format: `[{ id: 0|1, msg: string, date: ISOString }]`. `0` = user, `1` = assistant.
  - `uploads` — `id` (uuid), `user_id`, `session_id`, `filename`, `file_type`, `file_size`, `file_data` (base64 text), `analysis_result` (text).
  - `documents` — `id`, `user_id`, `content` (text), `embedding` (vector or jsonb/list).
  - `system_prompts` — `session_id`, `user_id`, `prompt`, `created_at`, `updated_at`.
- **RLS:** RLS policies MUST be enabled on ALL user-facing tables. The backend bypasses RLS via Service Key. The frontend relies on RLS for direct Supabase queries (if any). Currently, the frontend goes through the REST API for data access.
- **File Storage:** Files are stored as base64 in the `uploads` table (NOT Supabase Storage bucket). Audio URLs served via `/uploads/{upload_id}` hit the `analysis.py` endpoint which decodes base64 and streams bytes.

### OpenAI Integration
- **Client:** Initialized once in `backend/config.py` as `openai_client = OpenAI(api_key=...)`. Reuse this instance.
- **Chat Model:** `gpt-4o-mini` for ALL chat completions (including image analysis and file summarization).
- **Embeddings:** `text-embedding-3-small` for document and query embeddings.
- **Image Analysis:** Vision API with base64 data URLs (`data:{mime};base64,{data}`). Max tokens capped at 1000.
- **PDF/TXT Analysis:** Extract text (`pdfplumber` or `utf-8` decode), truncate to 12,000 chars, summarize via chat completion.

### ElevenLabs Integration
- **TTS:** `elevenlabs_client.text_to_speech.convert()` with model `eleven_multilingual_v2`. Default voice ID: `21m00Tcm4TlvDq8ikWAM` (Rachel). Voice settings: `stability=0.5`, `similarity_boost=0.75`, `style=0.0`, `use_speaker_boost=True`.
- **STT:** `elevenlabs_client.speech_to_text.convert()` with model `scribe_v2`. `tag_audio_events=False`, `diarize=False`.
- **ConvAI Agent:** Frontend loads the ElevenLabs ConvAI SDK from CDN in `AgentPage`. Backend receives webhooks at `POST /webhook/elevenlabs` and logs events to the database.

### Embeddings & RAG
- Document embeddings are generated with OpenAI and stored in the `documents` table.
- Similarity search is done in PYTHON using `scipy.spatial.distance.cosine`. Threshold for relevance: `similarity > 0.3`.
- Top 3 relevant documents are injected into the chat context as a system message.
- ALWAYS guard embedding array lengths before computing cosine to prevent crashes.

---

## Deployment & Environment Rules

### Frontend (Vercel)
- Build command: `bun install && bun run build.ts` (script `vercel-build`).
- Output directory: `frontend/public`.
- `vercel.json` routes all paths to `/frontend/$1` (SPA catch-all).
- NO server-side functions. NO API routes in Vercel. Backend is separate.

### Backend (Render / Railway)
- Entry: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
- `Procfile` and `railway.json` are present. Use `python-3.12` runtime.
- CORS is set to `allow_origins=["*"]` for development. Tighten this for production.
- Health checks: `GET /` and `GET /health`.

### Environment Variables

**Backend (`backend/.env`):**
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_AGENT_ID`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY` (service role)
- `SUPABASE_JWT_SECRET`
- `OPENAI_API_KEY`
- `PORT` (default 8000)
- `ENVIRONMENT`
- `ELEVENLABS_WEBHOOK_SECRET` (optional)

**Frontend (`frontend/.env`):**
- `BUN_PUBLIC_API_URL` (backend URL)
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (injected at build; careful with exposure)
- `ELEVENLABS_API_KEY` (injected at build; careful with exposure)

**Security Warning:** `build.ts` currently injects `OPENAI_API_KEY` and `ELEVENLABS_API_KEY` into the frontend bundle. If these are secret keys, they will be exposed to users. The frontend should only use public/anon keys for client-side SDKs.

---

## Commands

```bash
# Frontend dev
bun --hot src/index.ts

# Frontend build (outputs to public/)
bun run build.ts

# Backend dev
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Backend prod
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Absolute Prohibitions

- NEVER add a `tailwind.config.js` — Tailwind v4 uses CSS-only config.
- NEVER use `npm` or `node` for the frontend. Use `bun` exclusively.
- NEVER store frontend state in `localStorage` or `sessionStorage`. Use Zustand (in-memory) + Supabase for persistence.
- NEVER call Supabase REST API directly from the frontend for chat/sessions/documents. Go through the FastAPI backend so auth, RAG, and business logic are centralized.
- NEVER change the JSONB message schema in `sessions.messages` without updating BOTH `database.py` (backend) and `chatStore.ts`/`useChat.ts` (frontend).
- NEVER commit `.env` files or real API keys.
- NEVER use WebSockets on Vercel. The WS endpoint MUST target the Render backend URL.
- NEVER forget to verify `user_id` ownership on ALL database mutations in the backend.
