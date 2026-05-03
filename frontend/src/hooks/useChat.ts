import { useCallback, useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { supabase } from '../lib/supabaseClient';
import type { Message } from '../types';

const API_URL = process.env.BUN_PUBLIC_API_URL || 'http://localhost:8000';
let WS_URL = process.env.BUN_PUBLIC_WS_URL;

// TRUCO: Si WS_URL no carga por algún motivo, la construimos desde API_URL
if (!WS_URL || WS_URL.includes('localhost')) {
  if (!API_URL.includes('localhost')) {
    // Si la API es https://...render.com, convertimos a wss://...render.com
    WS_URL = API_URL.replace('https://', 'wss://').replace('http://', 'ws://');
  } else {
    WS_URL = 'ws://localhost:8000';
  }
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
      
      // TRANSFORMACIÓN DE DATOS: 
      // Backend { id: 0/1, msg: "..." } -> Frontend { role: "user"/"assistant", content: "..." }
      const formattedMessages: Message[] = (data.messages || []).map((msg: any, index: number) => ({
        id: `${sid}-${index}-${new Date(msg.date).getTime()}`, // Generamos un ID único para React
        session_id: sid,
        role: msg.id === 0 ? 'user' : 'assistant', // 0 es usuario, 1 es asistente
        content: msg.msg, // 'msg' es la nueva key del backend
        created_at: msg.date,
      }));

      setMessages(formattedMessages); // Actualizamos el store con el historial
    } catch (err) {
      console.error('Error fetching messages:', err);
      // No seteamos error global para no bloquear la UI si solo falla el historial
    }
  }, [setMessages]);

  // 2. EFECTO: Cargar mensajes cuando cambia el sessionId
  useEffect(() => {
    if (sessionId) {
      fetchMessages(sessionId);
    } else {
      setMessages([]); // Limpiar si no hay sesión
    }
  }, [sessionId, fetchMessages, setMessages]);


  // 3. Connect to WebSocket (Ligeramente ajustado)
  const connect = useCallback(async () => {
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
            // Opcional: Si el backend devuelve un ID nuevo, podrías actualizar la URL
            return;
          }
          
          if (data.type === 'token') {
            if (!isStreamingRef.current) {
              isStreamingRef.current = true;
              setIsStreaming(true);
              
              // El primer token crea el mensaje del asistente
              const newMessage: Message = {
                id: `temp-${Date.now()}`,
                session_id: sessionId || '',
                role: 'assistant',
                content: data.content || '',
                created_at: new Date().toISOString(),
              };
              addMessage(newMessage);
            } else {
              // Los siguientes tokens actualizan el último mensaje
              updateLastMessage(data.content || '');
            }
            return;
          }

          if (data.type === 'audio') {
            // Handle audio URL from backend
            if (data.audio_url) {
              updateLastMessageAudio(data.audio_url);
            }
            return;
          }
          
          if (data.type === 'done') {
            isStreamingRef.current = false;
            setIsStreaming(false);
            setIsLoading(false);
            
            // Update with audio_url if provided in done message
            if (data.audio_url) {
              updateLastMessageAudio(data.audio_url);
            }
            
            // Opcional: Recargar historial completo para asegurar sincronización con DB
            // if (sessionId) fetchMessages(sessionId); 
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
        // No mostrar error visual inmediato si es solo reconexión silenciosa
        // setError('Connection error'); 
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

  // 4. Send Message (Igual que antes)
  const sendMessage = useCallback(async (content: string, overrideSessionId?: string, enableVoice: boolean = false) => {
    if (!content.trim()) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      setError('Not authenticated');
      return;
    }
    tokenRef.current = session.access_token;
    
    // Use override sessionId if provided, otherwise use the hook's sessionId
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
    connect();
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