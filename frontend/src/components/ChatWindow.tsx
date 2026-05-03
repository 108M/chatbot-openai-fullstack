import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Send, Loader2, FileText, File, Download, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { VoiceRecorder } from './VoiceRecorder';
import { FileUploadButton } from './FileUploadButton';
import type { Message } from '../types';
import { cn } from '../lib/utils';
import { apiClient } from '../lib/apiClient';
import { toast } from 'sonner';

interface Props {
  messages: Message[];
  onSendMessage: (content: string, sessionId?: string, enableVoice?: boolean) => void;
  onAddMessage?: (message: Message) => void;
  isLoading: boolean;
  isConnected: boolean;
  sessionId?: string | null;
  userId?: string;
}

interface PendingFile {
  file: File;
  preview?: string;
  id: string;
}

export function ChatWindow({ messages, onSendMessage, onAddMessage, isLoading, isConnected, sessionId, userId }: Props) {
  const [input, setInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzingFile, setIsAnalyzingFile] = useState(false);
  const [pendingFile, setPendingFile] = useState<PendingFile | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  // Get API URL from environment or use default
  const apiUrl = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:8000';

  // Parse message content for IMG and FILE patterns
  const parseMessageContent = (content: string) => {
    // Pattern: [IMG:upload_id] or [FILE:upload_id:EXT]
    const imgPattern = /\[IMG:([a-f0-9\-]+)\]/g;
    const filePattern = /\[FILE:([a-f0-9\-]+):([A-Z]+)\]/g;
    
    const hasImg = imgPattern.test(content);
    const hasFile = filePattern.test(content);
    
    imgPattern.lastIndex = 0;
    filePattern.lastIndex = 0;
    
    const imgMatch = imgPattern.exec(content);
    const fileMatch = filePattern.exec(content);
    
    return {
      hasImg,
      hasFile,
      imgId: imgMatch?.[1],
      fileId: fileMatch?.[1],
      fileExt: fileMatch?.[2],
      remainingContent: content
        .replace(/\[IMG:[a-f0-9\-]+\]\s*/g, '')
        .replace(/\[FILE:[a-f0-9\-]+:[A-Z]+\]\s*/g, '')
        .trim()
    };
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Detect mobile viewport to change placeholder and layout
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // If there's a pending file, analyze it with the user's prompt (don't send as normal message)
    if (pendingFile) {
      setIsAnalyzingFile(true);
      try {
        const file = pendingFile.file;
        const isImage = file.type.startsWith('image/');
        const fileId = pendingFile.id;

        // First, add the file/image to chat with the prompt
        if (isImage) {
          if (onAddMessage && sessionId && userId) {
            onAddMessage({
              id: fileId,
              session_id: sessionId,
              role: 'user',
              content: `![${file.name}](${pendingFile.preview})\n\n${input.trim()}`,
              created_at: new Date().toISOString(),
            });
          }
        } else {
          const ext = file.name.split('.').pop()?.toLowerCase() || 'file';
          if (onAddMessage && sessionId && userId) {
            onAddMessage({
              id: fileId,
              session_id: sessionId,
              role: 'user',
              content: `[FILE:${ext}:${file.name}]\n\n${input.trim()}`,
              created_at: new Date().toISOString(),
            });
          }
        }

        // Then analyze with the prompt
        let result;
        if (isImage) {
          result = await apiClient.analyzeImage(file, input.trim());
          const analysis = result.description || result.analysis || JSON.stringify(result);
          
          if (onAddMessage && sessionId) {
            onAddMessage({
              id: `analysis-${Date.now()}`,
              session_id: sessionId,
              role: 'assistant',
              content: analysis,
              created_at: new Date().toISOString(),
            });
          }
        } else {
          result = await apiClient.analyzeFile(file, input.trim());
          const analysis = result.summary || result.analysis || JSON.stringify(result);
          
          if (onAddMessage && sessionId) {
            onAddMessage({
              id: `analysis-${Date.now()}`,
              session_id: sessionId,
              role: 'assistant',
              content: analysis,
              created_at: new Date().toISOString(),
            });
          }
        }
        
        setPendingFile(null);
        setInput('');
      } catch (error) {
        console.error('File analysis error:', error);
        toast.error('Error al analizar el archivo');
      } finally {
        setIsAnalyzingFile(false);
      }
    } else {
      // Send normal message
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelected = async (file: File) => {
    const isImage = file.type.startsWith('image/');
    const fileId = `file-${Date.now()}`;

    try {
      // Only store file reference, don't show in chat yet
      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPendingFile({
            file,
            preview: e.target?.result as string,
            id: fileId,
          });
        };
        reader.readAsDataURL(file);
      } else {
        // Store the file reference for later analysis
        setPendingFile({
          file,
          id: fileId,
        });
      }
    } catch (error) {
      console.error('File selection error:', error);
      toast.error('Error al adjuntar el archivo');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget === inputAreaRef.current) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelected(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let item of Array.from(items)) {
      if (item.kind === 'file') {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          handleFileSelected(file);
        }
        break;
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Connection status */}
      {!isConnected && (
        <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-4 py-2 text-sm text-center border-b">
          Conectando con el servidor...
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 md:pb-4">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium">Inicia una conversación</h3>
              <p className="text-sm">Envía un mensaje para comenzar a chatear con el asistente de IA</p>
            </div>
          </div>
        )}

        {messages.map((message, index) => {
          const parsedContent = parseMessageContent(message.content);
          
          return (
          <div
            key={message.id}
            className={cn(
              'flex animate-in-up',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={cn(
                'max-w-[calc(100%-6rem)] md:max-w-[80%] rounded-lg px-4 py-2 shadow-sm transition-smooth hover:shadow-md',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {/* New: Handle IMG:id pattern */}
              {parsedContent.hasImg && parsedContent.imgId ? (
                <div className="space-y-2">
                  <img
                    src={`${apiUrl}/uploads/${parsedContent.imgId}`}
                    alt="uploaded image"
                    className="max-w-sm rounded-md"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {parsedContent.remainingContent && (
                    <div className="whitespace-pre-wrap break-all text-sm">
                      {parsedContent.remainingContent}
                    </div>
                  )}
                </div>
              ) : parsedContent.hasFile && parsedContent.fileId ? (
                // New: Handle FILE:id:EXT pattern
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 shrink-0" />
                    <span className="text-sm font-medium">{parsedContent.fileExt} File</span>
                    <a
                      href={`${apiUrl}/uploads/${parsedContent.fileId}`}
                      download
                      className="ml-auto"
                    >
                      <Download className="h-4 w-4 hover:opacity-70" />
                    </a>
                  </div>
                  {parsedContent.remainingContent && (
                    <div className="whitespace-pre-wrap break-all text-sm">
                      {parsedContent.remainingContent}
                    </div>
                  )}
                </div>
              ) : message.content.includes('![') && message.content.includes('](') ? (
                <div className="space-y-2">
                  <img
                    src={message.content.match(/!\[.*?\]\((.*?)\)/)?.[1]}
                    alt="preview"
                    className="max-w-sm rounded-md"
                  />
                  {message.content.split('\n\n').length > 1 && (
                    <div className="whitespace-pre-wrap break-all">
                      {message.content.split('\n\n').slice(1).join('\n\n')}
                    </div>
                  )}
                </div>
              ) : message.content.startsWith('[FILE:') ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {message.content.split(':')?.[1] === 'pdf' ? (
                      <FileText className="h-5 w-5 shrink-0" />
                    ) : (
                      <File className="h-5 w-5 shrink-0" />
                    )}
                    <span className="text-sm">{message.content.split(':').slice(2).join(':').split('\n\n')[0]}</span>
                  </div>
                  {message.content.split('\n\n').length > 1 && (
                    <div className="whitespace-pre-wrap break-all">
                      {message.content.split('\n\n').slice(1).join('\n\n')}
                    </div>
                  )}
                </div>
              ) : (
                <div className="whitespace-pre-wrap break-words markdown-content">{message.content}</div>
              )}
              {/* Audio player for AI responses */}
              {message.audio_url && message.role === 'assistant' && (
                <div className="mt-3 flex items-center gap-2">
                  <audio
                    controls
                    className="flex-1 h-8"
                    src={`${apiUrl}${message.audio_url}`}
                    onError={(e) => {
                      console.error('Audio playback error:', e);
                      toast.error('Error al reproducir audio');
                    }}
                  />
                </div>
              )}
              <div
                className={cn(
                  'text-xs mt-1',
                  message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                )}
              >
                {format(new Date(message.created_at), 'HH:mm')}
              </div>
            </div>
          </div>
        );
        })}

        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area - mobile: floating pill, desktop: normal */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-4 left-0 right-0 px-4 z-20 md:static md:px-0 md:py-0 md:border-t md:bg-card"
      >
        {/* Pending file indicator */}
        {pendingFile && (
          <div className="mb-3 p-3 bg-muted rounded-lg border border-primary/20">
            <div className="flex items-center gap-3">
              {pendingFile.preview ? (
                <img 
                  src={pendingFile.preview} 
                  alt="preview" 
                  className="h-12 w-12 object-cover rounded"
                />
              ) : (
                <div className="h-12 w-12 bg-background rounded flex items-center justify-center shrink-0">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{pendingFile.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(pendingFile.file.size / 1024).toFixed(1)} KB • Escribe tus instrucciones abajo
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPendingFile(null)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div
          ref={inputAreaRef}
          className={cn(
            // Mobile-first: floating pill with shadow and blur
            'flex items-center gap-2 transition-colors duration-200 mx-auto max-w-[980px] bg-card/80 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg',
            // Desktop: revert to inline toolbar
            'md:bg-transparent md:backdrop-blur-none md:rounded-none md:px-0 md:py-0 md:shadow-none md:mx-0 md:max-w-none md:gap-2',
            isDragging && 'bg-primary/10 rounded-lg p-2'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <VoiceRecorder
            onTranscript={(text) => {
              setInput(text);
              // Auto-submit after transcription with voice enabled
              setTimeout(() => {
                onSendMessage(text, undefined, true);
                setInput('');
              }, 100);
            }}
            disabled={!isConnected || isLoading || isAnalyzingFile}
          />
          <FileUploadButton
            onFileSelected={handleFileSelected}
            disabled={!isConnected || isLoading || isAnalyzingFile}
          />
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={isMobile ? "Escribe un mensaje" : (pendingFile ? "Escribe instrucciones para procesar el archivo..." : "Escribe un mensaje o pega/arrastra un archivo...")}
            className="min-h-[44px] max-h-32 resize-none flex-1 text-base placeholder:text-base bg-transparent"
            disabled={!isConnected || isLoading || isAnalyzingFile}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading || !isConnected || isAnalyzingFile}
            className="hover:scale-110 active:scale-95 transition-all duration-200 disabled:hover:scale-100 h-10 w-10 rounded-full flex items-center justify-center md:h-auto md:w-auto md:rounded-none"
          >
            {isAnalyzingFile ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
