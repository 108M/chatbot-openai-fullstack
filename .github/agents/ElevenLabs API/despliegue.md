# Despliegue de ElevenLabs

## Variables de Entorno

### Backend (Render)

```bash
ELEVENLABS_API_KEY=your_api_key
ELEVENLABS_AGENT_ID=agent_1101khqxwk2qe618dx60req50egm
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJxxxxx
SUPABASE_JWT_SECRET=xxxxx
```

### Frontend (Vercel)

```bash
REACT_APP_ELEVENLABS_AGENT_ID=agent_1101khqxwk2qe618dx60req50egm
REACT_APP_ELEVENLABS_API_KEY=your_public_api_key_here
```

**Importante:** La API key del frontend debe ser la **clave pública** (no la secreta). Obtén la pública en https://elevenlabs.io/app/settings/api-keys.

## Pasos de Despliegue

### 1. Backend (Render)

```bash
git add -A
git commit -m "Add Eleven Labs Agent integration"
git push
```

Render hace deploy automático.

### 2. Verificar Backend

```bash
curl https://chatbot-app-markel.onrender.com/agent/status
```

Debe mostrar `agent_configured: true`.

### 3. Probar Webhook

```bash
curl -X POST https://chatbot-app-markel.onrender.com/agent/test-webhook
```

### 4. Configurar Webhook en ElevenLabs

1. Ve a https://elevenlabs.io/app/agents
2. Selecciona tu agente → **Settings → Webhooks**
3. Webhook URL: `https://chatbot-app-markel.onrender.com/webhook/elevenlabs`
4. Suscribirse a:
   - ✅ `user_message`
   - ✅ `agent_response`
   - ✅ `session_ended`
5. Guardar

### 5. Frontend (Vercel)

```bash
git add -A
git commit -m "Add Eleven Labs Agent UI"
git push
```

Vercel hace deploy automático.

## Troubleshooting

| Problema | Solución |
|----------|----------|
| **403 Agent ID mismatch** | Asegúrate de que `ELEVENLABS_AGENT_ID` en el backend coincide con el configurado en ElevenLabs. |
| **Webhook no se dispara** | Verifica que la URL sea exacta (sin `/` al final). |
| **No aparecen logs** | Comprueba que los eventos `user_message` y `agent_response` estén suscritos en ElevenLabs. |
| **Base de datos vacía** | Asegúrate de usar `SUPABASE_SERVICE_KEY` (no `SUPABASE_KEY`). |
| **Frontend no carga el agente** | Verifica que las variables `REACT_APP_ELEVENLABS_*` existan en Vercel. |

## URLs de Referencia

- Dashboard ElevenLabs: https://elevenlabs.io/app/agents
- API Keys: https://elevenlabs.io/app/settings/api-keys
- Webhook URL del proyecto: `https://chatbot-app-markel.onrender.com/webhook/elevenlabs`
- Health Check: `https://chatbot-app-markel.onrender.com/agent/status`

## Siguientes Pasos

1. Añade prompts personalizados en el dashboard de ElevenLabs.
2. Implementa acciones secundarias en `_handle_user_actions()`.
3. Construye una landing page alrededor del widget del agente.
4. Monitorea los logs para identificar patrones de mejora.
