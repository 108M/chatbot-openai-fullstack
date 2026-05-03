// Types for the chatbot application

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
  audio_url?: string;
}

export interface Upload {
  id: string;
  user_id: string;
  session_id: string;
  filename: string;
  file_type: string;
  size: number;
  analysis_result: string | null;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ChatState {
  messages: Message[];
  currentSession: Session | null;
  sessions: Session[];
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
}

// Voice recording and transcription types
export type RecordingState = 'idle' | 'recording' | 'processing' | 'error';

export interface TranscriptionResult {
  text: string;
  language?: string;
  duration?: number;
}

export interface AudioVoice {
  voice_id: string;
  name: string;
}
