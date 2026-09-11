# Eleven Labs Agent Deployment Checklist

## Your Agent Information

**Agent ID:** `agent_1101khqxwk2qe618dx60req50egm`

Copy this ID to:
- `ELEVENLABS_AGENT_ID` in Render environment variables
- `REACT_APP_ELEVENLABS_AGENT_ID` in Vercel environment variables

---

## Backend (Render) Setup

### 1. Add Environment Variables

Go to your Render service dashboard → **Environment** and add:

```
ELEVENLABS_API_KEY=your_api_key
ELEVENLABS_AGENT_ID=agent_1101khqxwk2qe618dx60req50egm
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJxxxxx
SUPABASE_JWT_SECRET=xxxxx
```

### 2. Deploy

```bash
git add -A
git commit -m "Add Eleven Labs Agent integration"
git push
```

Render auto-deploys. Check logs to confirm.

### 3. Verify Backend

```bash
curl https://chatbot-app-markel.onrender.com/agent/status
```

Should show your agent ID (masked).

### 4. Test Webhook

```bash
curl -X POST https://chatbot-app-markel.onrender.com/agent/test-webhook
```

### 5. Configure Webhook in Eleven Labs

1. Go to your agent at https://elevenlabs.io/app/agents
2. Settings → **Webhooks**
3. Set webhook URL to: `https://chatbot-app-markel.onrender.com/webhook/elevenlabs`
4. Subscribe to:
   - ✅ `user_message`
   - ✅ `agent_response` (not just `agent_started`)
   - ✅ `session_ended`
5. Save

---

## Frontend (Vercel) Setup

### 1. Add Environment Variables

In Vercel Project Settings → **Environment Variables**, add:

```
REACT_APP_ELEVENLABS_AGENT_ID=agent_1101khqxwk2qe618dx60req50egm
REACT_APP_ELEVENLABS_API_KEY=your_public_api_key_here
```

**Get your public API key:**
- Go to https://elevenlabs.io/app/settings/api-keys
- Click on your API key
- Copy the "public" key (different from the secret one)

### 2. Create Agent Component

Create `src/components/ElevenLabsAgent.tsx`:

```tsx
import { useEffect } from 'react';

export function ElevenLabsAgent() {
  useEffect(() => {
    const agentId = process.env.REACT_APP_ELEVENLABS_AGENT_ID;
    const apiKey = process.env.REACT_APP_ELEVENLABS_API_KEY;

    if (!agentId || !apiKey) {
      console.error("Missing REACT_APP_ELEVENLABS_* variables");
      return;
    }

    // Load Eleven Labs SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@elevenlabs/convai@latest/dist/index.min.js';
    script.async = true;
    script.onload = () => {
      if (window.ElevenLabs) {
        const client = new window.ElevenLabs.ConvaiClient({
          publicKey: apiKey,
          agentId: agentId,
          onMessage: (message) => console.log('Message:', message),
          onError: (error) => console.error('Error:', error)
        });

        client.startSession();
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Agent de Voz</h1>
      <p>Haz clic en el micrófono para comenzar</p>
    </div>
  );
}
```

### 3. Import in Your Main App

```tsx
import { ElevenLabsAgent } from './components/ElevenLabsAgent';

export function App() {
  return <ElevenLabsAgent />;
}
```

### 4. Deploy

```bash
git add -A
git commit -m "Add Eleven Labs Agent UI"
git push
```

Vercel auto-deploys.

---

## Testing

### 1. Check Backend Logs

```bash
# Via Render CLI
render logs -s chatbot-api
```

Should see:
```
INFO:     Eleven Labs webhook received: event_type=user_message, agent_id=agent_1101khqxwk2qe618dx60req50egm
INFO:     Logging user message: Hola...
INFO:     User message saved to database
```

### 2. Test Real Conversation

1. Go to https://elevenlabs.io/app/agents
2. Click on your agent
3. Click **Preview** or **Test**
4. Say something: "Hola"
5. Check Render logs - should see webhook activity

### 3. Check Frontend

1. Go to your Vercel frontend URL
2. You should see "Agent de Voz"
3. Click microphone and try to speak
4. Check browser console for any errors

### 4. Verify Database

Check Supabase:
- Table `sessions` - new session created?
- Table `messages` - conversations logged?

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 403 Agent ID mismatch | Make sure `ELEVENLABS_AGENT_ID` in backend matches webhook config in Eleven Labs |
| Webhook not firing | Verify webhook URL is exactly `https://chatbot-app-markel.onrender.com/webhook/elevenlabs` (no trailing slash) |
| No logs appearing | Check if events are configured ("user_message", "agent_response") in Eleven Labs webhook settings |
| Database empty | Ensure `SUPABASE_SERVICE_KEY` is correct (it's different from `SUPABASE_KEY`) |
| Frontend not loading agent | Verify `REACT_APP_ELEVENLABS_*` env vars exist in Vercel project settings |

---

## Quick Reference

Your Agent ID: `agent_1101khqxwk2qe618dx60req50egm`

Webhook URL: `https://chatbot-app-markel.onrender.com/webhook/elevenlabs`

Frontend URL: Check your Vercel project URL

---

## Next Steps

Once everything is working:
1. Add custom system prompts in Eleven Labs dashboard
2. Implement secondary actions in `_handle_user_actions()` function
3. Build landing page around the agent widget
4. Monitor logs for patterns and improvements
