import { create } from 'zustand';
import type { Message, Session } from '../types';
import { supabase } from '../lib/supabaseClient';

const API_URL = process.env.BUN_PUBLIC_API_URL || 'http://localhost:8000';

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
  messages: [],
  sessions: [],
  currentSession: null,
  isConnected: false,
  isLoading: false,
  isLoadingSessions: false,
  error: null,

  // Message actions
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),

  updateLastMessage: (content) => set((state) => {
    // Clona el array de mensajes
    const messages = [...state.messages];
    if (messages.length === 0) return { messages };

    const lastMessage = messages[messages.length - 1];
    
    // Solo actualizamos si el último es del asistente
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
    
    // Solo actualizamos si el último es del asistente
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

  // --- FUNCIÓN ACTUALIZADA ---
  loadSession: async (sessionId: string) => {
    set({ isLoading: true, error: null });
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/sessions/${sessionId}/messages`, { headers });
      
      if (!response.ok) throw new Error('Failed to load session');
      
      const data = await response.json();
      
      // TRANSFORMACIÓN DE DATOS (IMPORTANTE)
      // El backend devuelve: { id: 0/1, msg: "...", date: "..." }
      // El frontend necesita: { role: 'user'/'assistant', content: "...", ... }
      
      const rawMessages = data.messages || [];
      
      const formattedMessages: Message[] = rawMessages.map((msg: any, index: number) => ({
        // Creamos un ID único compuesto para React keys
        id: `${sessionId}-${index}-${new Date(msg.date).getTime()}`,
        session_id: sessionId,
        // Convertimos 0 -> user, 1 -> assistant
        role: msg.id === 0 ? 'user' : 'assistant',
        // Mapeamos msg -> content
        content: msg.msg || '',
        created_at: msg.date
      }));
      
      // Buscar la sesión en la lista actual para setear currentSession
      const sessions = get().sessions;
      const session = sessions.find(s => s.id === sessionId);
      
      set({ 
        messages: formattedMessages,
        currentSession: session || null, // Si no está en la lista (ej: carga directa por URL), puede ser null por ahora
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
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
        method: 'DELETE',
        headers,
      });
      
      if (!response.ok) throw new Error('Failed to delete session');
      
      set((state) => {
        const sessions = state.sessions.filter(s => s.id !== sessionId);
        // Si borramos la sesión actual, limpiamos la vista
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