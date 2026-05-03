import { supabase } from './supabaseClient';

const API_URL = process.env.BUN_PUBLIC_API_URL || 'http://localhost:8000';

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
    // If it's already a full path starting with /, just prepend the API URL
    if (pathOrFilename.startsWith('/')) {
      return `${API_URL}${pathOrFilename}`;
    }
    // Otherwise, treat it as a filename
    return `${API_URL}/audio/${pathOrFilename}`;
  },

  // Embedding and document search functions
  async addDocument(content: string) {
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
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/documents?limit=${limit}&offset=${offset}`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch documents');
    return response.json();
  },

  async deleteDocument(documentId: string) {
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
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/system-prompt/${sessionId}`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch system prompt');
    return response.json();
  },
};
