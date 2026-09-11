# ChatBot - Aplicación Full-Stack con OpenAI

Chatbot conversacional multimodal full-stack (**React + FastAPI**), nacido
como caso de uso práctico para explorar arquitecturas de IA conversacional
durante mi TFG. Incluye:
- 🤖 Chat en tiempo real con OpenAI GPT
- 🎤 Text-to-Speech y Speech-to-Text con ElevenLabs
- 👁️ Análisis de imágenes con OpenAI Vision
- 📄 Soporte para archivos PDF y TXT
- 💾 Historial persistente con Supabase
- 🔐 Autenticación JWT

- Demo backend: https://chatbot-app-markel.onrender.com
- Demo frontend: https://chatbot-app-markel.vercel.app/

*(Los despliegues de demo pueden estar dormidos/desactualizados al ser un plan gratuito — para probarlo de verdad, sigue la sección de desarrollo local.)*

## 📁 Estructura del Proyecto

```
ChatBot/
├── frontend/          # React + Bun + TypeScript
│   ├── src/
│   ├── dist/         # Build output (generado)
│   └── package.json
├── backend/          # FastAPI + Python
│   ├── routes/       # Endpoints modulares
│   ├── main.py       # Servidor principal
│   └── requirements.txt
├── vercel.json       # Configuración Vercel
└── DEPLOYMENT_VERCEL.md  # Guía de despliegue
```

## 🚀 Despliegue en Vercel

**IMPORTANTE**: Este proyecto usa WebSockets, que **NO son soportados** por Vercel Serverless Functions.

### Solución Recomendada:
1. **Frontend en Vercel** (sitio estático) ✅
2. **Backend en Railway/Render** (soporte WebSocket) ✅

📖 **Lee la guía completa**: [DEPLOYMENT_VERCEL.md](./DEPLOYMENT_VERCEL.md)

### Quick Start - Despliegue

#### Frontend en Vercel
```bash
# Opción 1: Interfaz web
# 1. Ve a vercel.com
# 2. Importa este repositorio
# 3. Deploy automático

# Opción 2: CLI
npm i -g vercel
vercel --prod
```

#### Backend en Railway
```bash
# 1. Ve a railway.app
# 2. "New Project" → "Deploy from GitHub"
# 3. Selecciona el repositorio
# 4. Configura variables de entorno
# 5. Deploy automático
```

## 🛠️ Desarrollo Local

### Prerequisitos
- [Bun](https://bun.sh) (para el frontend)
- Python 3.11+ (para el backend)
- Cuenta Supabase
- API Keys: OpenAI, ElevenLabs

### Setup Frontend

```bash
cd frontend

# Instalar dependencias
bun install

# Copiar y configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores

# Desarrollo
bun run dev

# Build
bun run build
```

**Nota sobre Path Aliases**: El proyecto usa `@/` como alias para `src/`. El sistema de build incluye un plugin personalizado (`pathAliasPlugin.ts`) que resuelve estos aliases correctamente durante la compilación.

### Setup Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Copiar y configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores

# Ejecutar servidor
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Acceder a la aplicación
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Docs API: http://localhost:8000/docs

## 🔑 Variables de Entorno

### Frontend (.env)
```env
BUN_PUBLIC_API_URL=http://localhost:8000
BUN_PUBLIC_SUPABASE_URL=your_supabase_url
BUN_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```env
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
SUPABASE_JWT_SECRET=your-jwt-secret
FRONTEND_URL=https://your-app.vercel.app
```

Ver archivos `.env.example` para más detalles.

## 📦 Tecnologías

### Frontend
- ⚡ **Bun** - Runtime y bundler
- ⚛️ **React 19** - UI library
- 🎨 **Tailwind CSS** - Styling
- 🧩 **Radix UI** - Componentes accesibles
- 🗄️ **Zustand** - State management
- 📝 **React Hook Form** - Formularios
- 🔐 **Supabase Auth** - Autenticación

### Backend
- 🐍 **FastAPI** - Framework web moderno
- 🔌 **WebSockets** - Chat en tiempo real
- 🤖 **OpenAI API** - GPT + Vision
- 🎤 **ElevenLabs** - TTS/STT
- 🗄️ **Supabase** - Base de datos PostgreSQL
- 🔒 **JWT** - Autenticación segura

## 📖 Documentación Adicional

- [DEPLOYMENT_VERCEL.md](./DEPLOYMENT_VERCEL.md) - Guía completa de despliegue
- [EMBEDDINGS_IMPLEMENTATION.md](./EMBEDDINGS_IMPLEMENTATION.md) - Implementación de embeddings
- [plan.md](./plan.md) - Plan de desarrollo

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Proyecto personal/portfolio, sin licencia de código abierto formal. Puedes
leer el código con fines de aprendizaje; pregúntame antes de reutilizarlo en
otro proyecto.

## 🐛 Troubleshooting

### Error: WebSocket connection failed
- Asegúrate de que el backend está corriendo
- Verifica que la URL del backend es correcta
- En producción, usa `wss://` en lugar de `ws://`

### Error: CORS policy
- Actualiza `FRONTEND_URL` en el backend
- Verifica que el dominio esté en `allow_origins`

### Build fails en Vercel
- Verifica que Bun se instale correctamente
- Revisa los logs de build
- Prueba el build localmente primero

Para más ayuda, consulta [DEPLOYMENT_VERCEL.md](./DEPLOYMENT_VERCEL.md)
