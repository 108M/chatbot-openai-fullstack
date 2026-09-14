import { supabase } from './supabaseClient';

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
const isDemoMode = !(env.VITE_SUPABASE_URL || env.SUPABASE_URL);

async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  return headers;
}

async function getAuthHeadersMultipart(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = {};
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  return headers;
}

export const apiClient = {
  // Get chat history for a session
  async getHistory(sessionId: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/history/${sessionId}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch history');
    return response.json();
  },

  // Generate audio from text
  async generateAudio(text: string, voiceId?: string) {
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 1500));
      return { audio_url: '/demo-audio.mp3', filename: 'demo-audio.mp3' };
    }
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/generate-audio`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, voice_id: voiceId }),
    });
    if (!response.ok) throw new Error('Failed to generate audio');
    return response.json();
  },

  // Analyze an image
  async analyzeImage(file: File, prompt?: string) {
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 2000));
      return { description: `**Análisis de imagen (demo):**\n\nArchivo: ${file.name}\n\nEsta es una respuesta de demostración. En modo real, el backend analizaría la imagen usando visión por computadora.` };
    }
    const headers = await getAuthHeadersMultipart();
    const formData = new FormData();
    formData.append('file', file);
    if (prompt) {
      formData.append('prompt', prompt);
    }
    const response = await fetch(`${API_URL}/analyze-image`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to analyze image');
    return response.json();
  },

  // Analyze a file (PDF/TXT)
  async analyzeFile(file: File, prompt?: string) {
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 2000));
      return { summary: `**Análisis de archivo (demo):**\n\nArchivo: ${file.name}\nTamaño: ${(file.size / 1024).toFixed(1)} KB\n\nEsta es una respuesta de demostración. En modo real, el backend extraería el texto y lo analizaría con IA.` };
    }
    const headers = await getAuthHeadersMultipart();
    const formData = new FormData();
    formData.append('file', file);
    if (prompt) {
      formData.append('prompt', prompt);
    }
    const response = await fetch(`${API_URL}/analyze-file`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to analyze file');
    return response.json();
  },

  // Analyze multiple files
  async analyzeMultiple(files: File[], prompt?: string, sessionId?: string) {
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 2000));
      return {
        results: files.map(f => ({
          filename: f.name,
          status: 'success',
          analysis: `Análisis demo de ${f.name}`,
          type: f.type.startsWith('image/') ? 'image' : 'file',
        })),
        session_id: sessionId || 'demo-session',
      };
    }
    const headers = await getAuthHeadersMultipart();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    if (prompt) {
      formData.append('prompt', prompt);
    }
    if (sessionId) {
      formData.append('session_id', sessionId);
    }
    const response = await fetch(`${API_URL}/analyze-multiple`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to analyze files');
    return response.json();
  },

  // Transcribe audio to text
  async transcribeAudio(audioBlob: Blob) {
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 1000));
      return { text: 'Esto es una transcripción de demostración. En modo real, el audio se enviaría a un servicio de speech-to-text.' };
    }
    const headers = await getAuthHeadersMultipart();
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    const response = await fetch(`${API_URL}/transcribe-audio`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to transcribe audio');
    return response.json();
  },

  // Get audio URL - handles both full paths and filenames
  getAudioUrl(pathOrFilename: string) {
    if (pathOrFilename.startsWith('/')) {
      return `${API_URL}${pathOrFilename}`;
    }
    return `${API_URL}/audio/${pathOrFilename}`;
  },

  // Embedding and document search functions
  async addDocument(content: string) {
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 500));
      return { id: `demo-doc-${Date.now()}`, content };
    }
    const headers = await getAuthHeadersMultipart();
    const formData = new FormData();
    formData.append('content', content);
    const response = await fetch(`${API_URL}/add-document`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to add document');
    return response.json();
  },

  async searchDocuments(query: string, limit: number = 10) {
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 800));
      return {
        results: [
          { id: 'demo-1', content: 'Documento de ejemplo sobre índices PostgreSQL y optimización de consultas.', similarity: 0.92 },
          { id: 'demo-2', content: 'Guía de configuración de pg_hba.conf para autenticación segura.', similarity: 0.85 },
        ],
      };
    }
    const headers = await getAuthHeadersMultipart();
    const formData = new FormData();
    formData.append('query', query);
    formData.append('limit', limit.toString());
    const response = await fetch(`${API_URL}/search-documents`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to search documents');
    return response.json();
  },

  async getDocuments(limit: number = 20, offset: number = 0) {
    if (isDemoMode) {
      return {
        documents: [
          { id: 'demo-doc-1', content: 'Documentación de la API de Aura AI v1.0' },
          { id: 'demo-doc-2', content: 'Guía de estilos para componentes React con Tailwind CSS' },
        ],
      };
    }
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/documents?limit=${limit}&offset=${offset}`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch documents');
    return response.json();
  },

  async deleteDocument(documentId: string) {
    if (isDemoMode) {
      return { success: true };
    }
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/documents/${documentId}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to delete document');
    return response.json();
  },

  // System Prompt functions
  async setSystemPrompt(sessionId: string, prompt: string) {
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 300));
      return { success: true };
    }
    const headers = await getAuthHeadersMultipart();
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('prompt', prompt);
    const response = await fetch(`${API_URL}/system-prompt`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to save system prompt');
    return response.json();
  },

  async getSystemPrompt(sessionId: string) {
    if (isDemoMode) {
      return { prompt: 'Eres un asistente de IA experto en tecnología, bases de datos y desarrollo de software.' };
    }
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/system-prompt/${sessionId}`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch system prompt');
    return response.json();
  },
};
