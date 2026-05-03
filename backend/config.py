"""
Configuration and client initialization for the ChatBot API
"""
import os
import logging
from dotenv import load_dotenv
from openai import OpenAI
from elevenlabs.client import ElevenLabs
from supabase import create_client, Client

# Cargar variables de entorno
load_dotenv()

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar clientes
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

elevenlabs_client = None
if os.getenv("ELEVENLABS_API_KEY"):
    elevenlabs_client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))
    try:
        import elevenlabs as _elevenlabs_pkg
        version = getattr(_elevenlabs_pkg, "__version__", "unknown")
    except Exception:
        version = "unknown"
    logger.info("ElevenLabs client initialized (version=%s)", version)
else:
    logger.warning("ELEVENLABS_API_KEY not set - ElevenLabs client disabled")

# Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_KEY")  # Use service key for backend
supabase: Client = create_client(supabase_url, supabase_key) if supabase_url and supabase_key else None

# JWT Secret from Supabase
JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

if not JWT_SECRET:
    logger.warning("SUPABASE_JWT_SECRET not set - authentication will be disabled for development")
