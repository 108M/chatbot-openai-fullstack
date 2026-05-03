"""
main.py - Backend arreglado para despliegue en Render
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Tus imports originales (NO LOS BORRES)
from config import supabase
from routes.chat import websocket_chat
from routes import sessions, audio, analysis, documents, system_prompts, elevenlabs_agent

app = FastAPI(title="Chatbot API", version="1.0.0")

# --- CONFIGURACIÓN CORS BLINDADA ---
# Esto permite que Vercel, Localhost y tu prima entren sin errores.
# Es la solución definitiva para dejar de sufrir con "Access-Control-Allow-Origin".
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <--- AQUÍ ESTÁ LA CLAVE: Acepta todo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket endpoint
app.websocket("/ws/chat")(websocket_chat)

# Routers
app.include_router(sessions.router, tags=["sessions"])
app.include_router(audio.router, tags=["audio"])
app.include_router(analysis.router, tags=["analysis"])
app.include_router(documents.router, tags=["documents"])
app.include_router(system_prompts.router, tags=["system_prompts"])
app.include_router(elevenlabs_agent.router, tags=["agent"])

# Health check (Útil para que Render sepa que estás vivo)
@app.get("/")
async def root():
    return {"status": "active", "message": "Backend funcionando correctamente 🚀"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "supabase": supabase is not None}

@app.get("/public-config")
async def public_config():
    """Serve public configuration (Agent ID, API Key) for frontend runtime loading"""
    return {
        "elevenlabs_agent_id": os.getenv("ELEVENLABS_AGENT_ID", ""),
        "elevenlabs_api_key": os.getenv("ELEVENLABS_API_KEY", ""),
    }

if __name__ == "__main__":
    import uvicorn
    
    # Configuración dinámica del puerto (Vital para Render)
    port = int(os.getenv("PORT", 8000))
    
    # Reload solo en local si no hay variable de entorno
    reload = os.getenv("ENVIRONMENT", "development") == "development"
    
    uvicorn.run(app, host="0.0.0.0", port=port, reload=reload)