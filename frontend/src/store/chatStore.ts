import { create } from 'zustand';
import type { Message, Session } from '../types';
import { supabase } from '../lib/supabaseClient';

// Helper seguro para leer variables de entorno
function getEnv(): Record<string, string | undefined> {
  try {
    const env = (import.meta as any).env;
    return env || {};
  } catch {
    return {};
  }
}

const env = getEnv();
const API_URL = env.BUN_PUBLIC_API_URL || env.VITE_API_URL || 'http://localhost:8000';

// Detect demo mode automatically
const hasCredentials = !!(env.VITE_SUPABASE_URL || env.SUPABASE_URL);
const isDemoMode = !hasCredentials;

// Demo data
const DEMO_SESSIONS: Session[] = [
  {
    id: 'demo-session-1',
    user_id: 'demo-user-id',
    title: 'Optimización de Base de Datos',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'demo-session-2',
    user_id: 'demo-user-id',
    title: 'Análisis de Mercado Q3',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'demo-session-3',
    user_id: 'demo-user-id',
    title: 'Componentes React - UI',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

const DEMO_MSG_1_USER = "Necesito optimizar una consulta SQL que está tardando mucho. Aquí está la estructura de las tablas involucradas y un pantallazo del plan de ejecución actual.";

const DEMO_MSG_1_ASSISTANT = `Analizando el plan de ejecución y la estructura de tus tablas, el cuello de botella principal es un **Sequential Scan** en la tabla \`usuarios_log\` debido a la falta de un índice adecuado para tu cláusula \`WHERE\`.

Te sugiero crear un índice compuesto y reestructurar ligeramente el \`JOIN\`. Aquí tienes el código optimizado:

\`\`\`sql
CREATE INDEX idx_usuarios_log_fecha_estado 
ON usuarios_log (fecha_creacion DESC, estado_id);

SELECT 
    u.nombre, 
    u.email, 
    COUNT(ul.id) as eventos_recientes
FROM 
    usuarios u
INNER JOIN 
    usuarios_log ul ON u.id = ul.usuario_id
WHERE 
    ul.fecha_creacion >= NOW() - INTERVAL '30 days'
    AND ul.estado_id = 5
GROUP BY 
    u.id, u.nombre, u.email
HAVING 
    COUNT(ul.id) > 10;
\`\`\`

Después de aplicar este índice, corre un \`EXPLAIN ANALYZE\` nuevamente. Deberías ver un **Index Scan** o **Bitmap Heap Scan**, lo cual reducirá el tiempo de ejecución significativamente.`;

const DEMO_MSG_2_USER = "Analiza los datos de ventas del Q3 y dime qué productos tuvieron mejor margen.";

const DEMO_MSG_2_ASSISTANT = `Basándome en los datos del Q3, los productos con mejor margen fueron:

1. **Software de Gestión Pro** — Margen del 78%
2. **Licencias Anuales Cloud** — Margen del 65%
3. **Consultoría Estratégica** — Margen del 62%

Los productos con menor rotación pero alto margen (oportunidad de upsell) fueron los módulos de Business Intelligence. Te recomiendo enfocar campañas de marketing en estos últimos para el Q4.`;

const DEMO_MSG_3_USER = "Dame ejemplos de componentes React con shadcn/ui para un dashboard de analytics.";

const DEMO_MSG_3_ASSISTANT = `Aquí tienes una estructura recomendada para un dashboard de analytics:

\`\`\`tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/charts";

export function AnalyticsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard title="Usuarios Activos" value="12.4K" trend="+8%" />
      <MetricCard title="Ingresos" value="$48.2K" trend="+12%" />
      <MetricCard title="Churn Rate" value="2.1%" trend="-0.5%" />
      <ChartCard title="Crecimiento Mensual">
        <LineChart data={growthData} />
      </ChartCard>
    </div>
  );
}
\`\`\`

Usa \`grid-cols-1 md:grid-cols-3\` para que sea responsive y las cards de shadcn/ui para mantener consistencia visual.`;

const DEMO_MESSAGES: Record<string, Message[]> = {
  'demo-session-1': [
    { id: 'msg-1', session_id: 'demo-session-1', role: 'user', content: DEMO_MSG_1_USER, created_at: new Date(Date.now() - 3500000).toISOString() },
    { id: 'msg-2', session_id: 'demo-session-1', role: 'assistant', content: DEMO_MSG_1_ASSISTANT, created_at: new Date(Date.now() - 3490000).toISOString() },
  ],
  'demo-session-2': [
    { id: 'msg-3', session_id: 'demo-session-2', role: 'user', content: DEMO_MSG_2_USER, created_at: new Date(Date.now() - 85000000).toISOString() },
    { id: 'msg-4', session_id: 'demo-session-2', role: 'assistant', content: DEMO_MSG_2_ASSISTANT, created_at: new Date(Date.now() - 84900000).toISOString() },
  ],
  'demo-session-3': [
    { id: 'msg-5', session_id: 'demo-session-3', role: 'user', content: DEMO_MSG_3_USER, created_at: new Date(Date.now() - 170000000).toISOString() },
    { id: 'msg-6', session_id: 'demo-session-3', role: 'assistant', content: DEMO_MSG_3_ASSISTANT, created_at: new Date(Date.now() - 169000000).toISOString() },
  ],
};

interface ChatStore {
  messages: Message[];
  sessions: Session[];
  currentSession: Session | null;
  isConnected: boolean;
  isLoading: boolean;
  isLoadingSessions: boolean;
  error: string | null;
  
  // Actions
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  updateLastMessageAudio: (audioUrl: string) => void;
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;
  
  setSessions: (sessions: Session[]) => void;
  setCurrentSession: (session: Session | null) => void;
  
  setIsConnected: (connected: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setIsLoadingSessions: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Async actions
  loadSessions: (userId: string) => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  createSession: (userId: string) => Promise<Session | null>;
  deleteSession: (sessionId: string) => Promise<void>;
  updateSessionTitle: (sessionId: string, title: string) => Promise<void>;
  createTempSession: (userId: string) => void;
}

// Helper para headers
async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('Not authenticated');
  }
  return {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  };
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: isDemoMode ? (DEMO_MESSAGES['demo-session-1'] ?? []) : [],
  sessions: isDemoMode ? DEMO_SESSIONS : [],
  currentSession: isDemoMode ? (DEMO_SESSIONS[0] ?? null) : null,
  isConnected: false,
  isLoading: false,
  isLoadingSessions: false,
  error: null,

  // Message actions
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),

  updateLastMessage: (content) => set((state) => {
    const messages = [...state.messages];
    if (messages.length === 0) return { messages };
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      messages[messages.length - 1] = {
        ...lastMessage,
        content: lastMessage.content + content,
      };
    }
    return { messages };
  }),

  updateLastMessageAudio: (audioUrl) => set((state) => {
    const messages = [...state.messages];
    if (messages.length === 0) return { messages };
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      messages[messages.length - 1] = {
        ...lastMessage,
        audio_url: audioUrl,
      };
    }
    return { messages };
  }),

  setMessages: (messages) => set({ messages }),
  
  clearMessages: () => set({ messages: [] }),

  // Session actions
  setSessions: (sessions) => set({ sessions }),
  
  setCurrentSession: (session) => set({ currentSession: session }),

  // State actions
  setIsConnected: (connected) => set({ isConnected: connected }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsLoadingSessions: (loading) => set({ isLoadingSessions: loading }),
  setError: (error) => set({ error }),

  // Async actions
  loadSessions: async (userId: string) => {
    if (isDemoMode) {
      set({ sessions: DEMO_SESSIONS, isLoadingSessions: false });
      return;
    }
    set({ isLoadingSessions: true, error: null });
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/sessions`, { headers });
      if (!response.ok) throw new Error('Failed to load sessions');
      const data = await response.json();
      set({ sessions: data.sessions || [], isLoadingSessions: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load sessions',
        isLoadingSessions: false 
      });
    }
  },

  loadSession: async (sessionId: string) => {
    if (isDemoMode) {
      const demoMessages = DEMO_MESSAGES[sessionId] ?? [];
      const session = DEMO_SESSIONS.find(s => s.id === sessionId) ?? null;
      set({ messages: demoMessages, currentSession: session, isLoading: false });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/sessions/${sessionId}/messages`, { headers });
      
      if (!response.ok) throw new Error('Failed to load session');
      
      const data = await response.json();
      
      const rawMessages = data.messages || [];
      
      const formattedMessages: Message[] = rawMessages.map((msg: any, index: number) => ({
        id: `${sessionId}-${index}-${new Date(msg.date).getTime()}`,
        session_id: sessionId,
        role: msg.id === 0 ? 'user' : 'assistant',
        content: msg.msg || '',
        created_at: msg.date
      }));
      
      const sessions = get().sessions;
      const session = sessions.find(s => s.id === sessionId);
      
      set({ 
        messages: formattedMessages,
        currentSession: session || null,
        isLoading: false 
      });

    } catch (error) {
      console.error("Load session error:", error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load session',
        isLoading: false 
      });
    }
  },

  createSession: async (userId: string) => {
    if (isDemoMode) {
      const newSession: Session = {
        id: `demo-${Date.now()}`,
        user_id: userId,
        title: 'Nueva conversación',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      set((state) => ({
        sessions: [newSession, ...state.sessions],
        currentSession: newSession,
        messages: [],
        isLoading: false,
      }));
      return newSession;
    }

    set({ isLoading: true, error: null });
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: 'Nueva conversación' }),
      });
      
      if (!response.ok) throw new Error('Failed to create session');
      
      const newSession = await response.json();
      
      set((state) => ({ 
        sessions: [newSession, ...state.sessions],
        currentSession: newSession,
        messages: [],
        isLoading: false 
      }));
      
      return newSession;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create session',
        isLoading: false 
      });
      return null;
    }
  },

  deleteSession: async (sessionId: string) => {
    if (isDemoMode) {
      set((state) => {
        const sessions = state.sessions.filter(s => s.id !== sessionId);
        const currentSession = state.currentSession?.id === sessionId ? null : state.currentSession;
        const messages = state.currentSession?.id === sessionId ? [] : state.messages;
        return { sessions, currentSession, messages };
      });
      return;
    }

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
        method: 'DELETE',
        headers,
      });
      
      if (!response.ok) throw new Error('Failed to delete session');
      
      set((state) => {
        const sessions = state.sessions.filter(s => s.id !== sessionId);
        const currentSession = state.currentSession?.id === sessionId ? null : state.currentSession;
        const messages = state.currentSession?.id === sessionId ? [] : state.messages;
        
        return { sessions, currentSession, messages };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete session',
      });
    }
  },

  updateSessionTitle: async (sessionId: string, title: string) => {
    if (isDemoMode) {
      set((state) => {
        const sessions = state.sessions.map(s => s.id === sessionId ? { ...s, title } : s);
        const currentSession = state.currentSession?.id === sessionId ? { ...state.currentSession, title } : state.currentSession;
        return { sessions, currentSession };
      });
      return;
    }

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error('Failed to update session');

      const updated = await response.json();

      set((state) => {
        const sessions = state.sessions.map(s => s.id === sessionId ? { ...s, title: updated.title } : s);
        const currentSession = state.currentSession?.id === sessionId ? { ...state.currentSession, title: updated.title } : state.currentSession;
        return { sessions, currentSession };
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update session' });
    }
  },

  createTempSession: (userId: string) => {
    const tempSession: Session = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      title: 'Nueva conversación',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    set({
      currentSession: tempSession,
      messages: [],
    });
  },
}));
