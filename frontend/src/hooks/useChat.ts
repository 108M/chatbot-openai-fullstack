import { useCallback, useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { supabase } from '../lib/supabaseClient';
import type { Message } from '../types';

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
const API_URL = (env.BUN_PUBLIC_API_URL || env.VITE_API_URL || 'http://localhost:8000') as string;
let WS_URL = (env.BUN_PUBLIC_WS_URL || env.VITE_WS_URL) as string | undefined;

const hasCredentials = !!(env.VITE_SUPABASE_URL || env.SUPABASE_URL);
const isDemoMode = !hasCredentials;

// TRUCO: Si WS_URL no carga por algún motivo, la construimos desde API_URL
if (!WS_URL || WS_URL.includes('localhost')) {
  if (!API_URL.includes('localhost')) {
    WS_URL = API_URL.replace('https://', 'wss://').replace('http://', 'ws://');
  } else {
    WS_URL = 'ws://localhost:8000';
  }
}

// Demo responses
const DEMO_RESPONSES = {
  default: 'Este es un modo de demostración. Configura las variables de entorno (VITE_SUPABASE_URL, VITE_API_URL) para conectar con el backend real.\n\nPuedes probar todas las funcionalidades de la UI: enviar mensajes, cambiar entre conversaciones, abrir paneles de herramientas, cambiar el tema, etc.',
  hola: '¡Hola! Bienvenido a Aura AI. ¿En qué puedo ayudarte hoy?',
  sql: 'Para optimizar consultas SQL, considera:\n\n1. Crear índices en columnas de `WHERE`, `JOIN` y `ORDER BY`\n2. Usar `EXPLAIN ANALYZE` para identificar Sequential Scans\n3. Evitar `SELECT *` y seleccionar solo columnas necesarias\n4. Usar particiones para tablas grandes\n\n¿Tienes una consulta específica que quieras revisar?',
  react: 'Algunos patrones útiles en React:\n\n```tsx\n// Custom hook para fetch\nfunction useData(url: string) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(url).then(r => r.json()).then(setData);\n  }, [url]);\n  return data;\n}\n```\n\n¿Necesitas ayuda con algún componente específico?',
} as const;

function getDemoResponse(content: string): string {
  const lower = content.toLowerCase();
  if (lower.includes('hola') || lower.includes('hi')) return DEMO_RESPONSES.hola;
  if (lower.includes('sql') || lower.includes('query') || lower.includes('base de datos')) return DEMO_RESPONSES.sql;
  if (lower.includes('react') || lower.includes('component')) return DEMO_RESPONSES.react;
  return DEMO_RESPONSES.default;
}

export function useChat(sessionId: string | null) {
  const wsRef = useRef<WebSocket | null>(null);
  const tokenRef = useRef<string | null>(null);
  const isConnectingRef = useRef(false);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isStreamingRef = useRef(false);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const {
    messages,
    setMessages,
    addMessage,
    updateLastMessage,
    updateLastMessageAudio,
    setIsConnected,
    setIsLoading,
    setError,
  } = useChatStore();

  // 1. NUEVA FUNCIÓN: Cargar historial con el nuevo formato JSONB
  const fetchMessages = useCallback(async (sid: string) => {
    if (isDemoMode) return; // Demo data ya está en el store
    if (!sid) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) return;

      const response = await fetch(`${API_URL}/sessions/${sid}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();
      
      const formattedMessages: Message[] = (data.messages || []).map((msg: any, index: number) => ({
        id: `${sid}-${index}-${new Date(msg.date).getTime()}`,
        session_id: sid,
        role: msg.id === 0 ? 'user' : 'assistant',
        content: msg.msg,
        created_at: msg.date,
      }));

      setMessages(formattedMessages);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, [setMessages]);

  // 2. EFECTO: Cargar mensajes cuando cambia el sessionId
  useEffect(() => {
    if (sessionId) {
      fetchMessages(sessionId);
    } else {
      setMessages([]);
    }
  }, [sessionId, fetchMessages, setMessages]);


  // 3. Connect to WebSocket
  const connect = useCallback(async () => {
    if (isDemoMode) {
      setIsConnected(false);
      return;
    }

    if (isConnectingRef.current || wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    isConnectingRef.current = true;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setError('Not authenticated');
        isConnectingRef.current = false;
        return;
      }
      tokenRef.current = session.access_token;

      if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
        wsRef.current.close();
      }

      const ws = new WebSocket(`${WS_URL}/ws/chat`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setError(null);
        isConnectingRef.current = false;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'session') {
            console.log('Session established:', data.session_id);
            return;
          }
          
          if (data.type === 'token') {
            if (!isStreamingRef.current) {
              isStreamingRef.current = true;
              setIsStreaming(true);
              
              const newMessage: Message = {
                id: `temp-${Date.now()}`,
                session_id: sessionId || '',
                role: 'assistant',
                content: data.content || '',
                created_at: new Date().toISOString(),
              };
              addMessage(newMessage);
            } else {
              updateLastMessage(data.content || '');
            }
            return;
          }

          if (data.type === 'audio') {
            if (data.audio_url) {
              updateLastMessageAudio(data.audio_url);
            }
            return;
          }
          
          if (data.type === 'done') {
            isStreamingRef.current = false;
            setIsStreaming(false);
            setIsLoading(false);
            
            if (data.audio_url) {
              updateLastMessageAudio(data.audio_url);
            }
            return;
          }
          
          if (data.type === 'error' || data.error) {
            setError(data.content || data.error || 'Unknown error');
            setIsLoading(false);
            isStreamingRef.current = false;
            setIsStreaming(false);
            return;
          }
        } catch (e) {
          if (isStreamingRef.current) {
            updateLastMessage(event.data);
          }
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
        isConnectingRef.current = false;
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        isConnectingRef.current = false;
        
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 3000);
      };
    } catch (error) {
      console.error('Failed to connect:', error);
      setError('Failed to connect to server');
      isConnectingRef.current = false;
    }
  }, [sessionId, addMessage, updateLastMessage, updateLastMessageAudio, setIsConnected, setIsLoading, setError]);

  // 4. Send Message
  const sendMessage = useCallback(async (content: string, overrideSessionId?: string, enableVoice: boolean = false) => {
    if (!content.trim()) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      setError('Not authenticated');
      return;
    }
    tokenRef.current = session.access_token;
    
    const targetSessionId = overrideSessionId || sessionId;

    // Optimistic UI update
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      session_id: targetSessionId || '',
      role: 'user',
      content: content.trim(),
      created_at: new Date().toISOString(),
    };
    addMessage(userMessage);

    if (isDemoMode) {
      // Simulate AI response in demo mode
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const response = getDemoResponse(content);
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          session_id: targetSessionId || '',
          role: 'assistant',
          content: response,
          created_at: new Date().toISOString(),
        };
        addMessage(assistantMessage);
      }, 1500);
      return;
    }

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      await connect();
      await new Promise<void>((resolve) => {
        const checkConnection = setInterval(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            clearInterval(checkConnection);
            resolve();
          }
        }, 100);
        setTimeout(() => {
          clearInterval(checkConnection);
          resolve();
        }, 5000);
      });
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      setIsLoading(true);
      isStreamingRef.current = false;
      setIsStreaming(false);
      
      const messageData = {
        message: content.trim(),
        session_id: targetSessionId,
        token: tokenRef.current,
        enable_voice: enableVoice,
      };
      
      console.log('Sending message with enableVoice:', enableVoice, 'Data:', messageData);
      wsRef.current.send(JSON.stringify(messageData));
    } else {
      setError('Not connected to server');
    }
  }, [sessionId, connect, addMessage, setIsLoading, setError]);

  useEffect(() => {
    if (!isDemoMode) {
      connect();
    }
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  return {
    messages,
    sendMessage,
    isStreaming,
    addMessage,
    isConnected: useChatStore((state) => state.isConnected),
    isLoading: useChatStore((state) => state.isLoading),
    error: useChatStore((state) => state.error),
  };
}
