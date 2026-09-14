import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import {
  Send, Loader2, FileText, File, Download, Copy,
  ThumbsUp, ThumbsDown, RotateCcw, Image as ImageIcon,
  Sparkles, User
} from 'lucide-react';
import { Button } from './ui/button';
import { VoiceRecorder } from './VoiceRecorder';
import { FileUploadButton } from './FileUploadButton';
import type { Message } from '../types';
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

interface CodeBlock {
  type: 'code';
  language: string;
  content: string;
}

interface TextBlock {
  type: 'text';
  content: string;
}

type ContentBlock = CodeBlock | TextBlock;

function parseContentBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const codeRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }
    blocks.push({ type: 'code', language: match[1] ?? 'text', content: (match[2] ?? '').trim() });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    blocks.push({ type: 'text', content: content.slice(lastIndex) });
  }

  if (blocks.length === 0) {
    blocks.push({ type: 'text', content });
  }

  return blocks;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => toast.success('Copiado al portapapeles'));
}

function parseMessageContent(content: string) {
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

  const apiUrl = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:8000';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    function onResize() { setIsMobile(window.innerWidth < 768); }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (pendingFile) {
      setIsAnalyzingFile(true);
      try {
        const file = pendingFile.file;
        const isImage = file.type.startsWith('image/');
        const fileId = pendingFile.id;

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
      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPendingFile({ file, preview: e.target?.result as string, id: fileId });
        };
        reader.readAsDataURL(file);
      } else {
        setPendingFile({ file, id: fileId });
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
    if (file) handleFileSelected(file);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let item of Array.from(items)) {
      if (item.kind === 'file') {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) handleFileSelected(file);
        break;
      }
    }
  };

  const renderMessageContent = (content: string, role: 'user' | 'assistant') => {
    const parsed = parseMessageContent(content);

    if (parsed.hasImg && parsed.imgId) {
      return (
        <div className="space-y-2">
          <img
            src={`${apiUrl}/uploads/${parsed.imgId}`}
            alt="uploaded image"
            className="max-w-sm rounded-md"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E';
            }}
          />
          {parsed.remainingContent && (
            <div className="whitespace-pre-wrap break-all text-sm">{parsed.remainingContent}</div>
          )}
        </div>
      );
    }

    if (parsed.hasFile && parsed.fileId) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium">{parsed.fileExt} File</span>
            <a href={`${apiUrl}/uploads/${parsed.fileId}`} download className="ml-auto" aria-label={`Descargar archivo`}>
              <Download className="h-4 w-4 hover:opacity-70" aria-hidden="true" />
            </a>
          </div>
          {parsed.remainingContent && (
            <div className="whitespace-pre-wrap break-all text-sm">{parsed.remainingContent}</div>
          )}
        </div>
      );
    }

    if (content.includes('![') && content.includes('](')) {
      return (
        <div className="space-y-2">
          <img
            src={content.match(/!\[.*?\]\((.*?)\)/)?.[1]}
            alt="preview"
            className="max-w-sm rounded-md"
          />
          {content.split('\n\n').length > 1 && (
            <div className="whitespace-pre-wrap break-all">
              {content.split('\n\n').slice(1).join('\n\n')}
            </div>
          )}
        </div>
      );
    }

    if (content.startsWith('[FILE:')) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {content.split(':')?.[1] === 'pdf' ? <FileText className="h-5 w-5 shrink-0" /> : <File className="h-5 w-5 shrink-0" />}
            <span className="text-sm">{content.split(':').slice(2).join(':').split('\n\n')[0]}</span>
          </div>
          {content.split('\n\n').length > 1 && (
            <div className="whitespace-pre-wrap break-all">{content.split('\n\n').slice(1).join('\n\n')}</div>
          )}
        </div>
      );
    }

    // Parse and render markdown blocks
    const blocks = parseContentBlocks(content);
    return (
      <div className="space-y-3">
        {blocks.map((block, idx) => {
          if (block.type === 'code') {
            return (
              <div key={idx} className="bg-inverse-surface rounded-lg border border-outline-variant overflow-hidden">
                <div className="flex justify-between items-center px-4 py-2 bg-on-secondary-fixed text-surface-container-high border-b border-outline-variant text-xs font-mono font-medium">
                  <span>{block.language}</span>
                  <button
                    onClick={() => copyToClipboard(block.content)}
                    className="flex items-center gap-1 hover:text-primary-fixed-dim transition-colors"
                  >
                    <Copy className="w-3 h-3" /> Copiar
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-sm font-mono text-surface-container-low">
                  <code>{block.content}</code>
                </pre>
              </div>
            );
          }
          return (
            <div key={idx} className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">
              {block.content}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Connection status */}
      {!isConnected && (
        <div className="bg-tertiary-fixed/20 text-tertiary px-4 py-2 text-sm text-center border-b border-tertiary/20">
          Conectando con el servidor...
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-[48rem] flex flex-col gap-8" role="log" aria-live="polite" aria-label="Mensajes del chat">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-on-surface-variant min-h-[200px]">
              <div className="text-center">
                <h3 className="text-lg font-medium text-on-surface">Inicia una conversación</h3>
                <p className="text-sm mt-1">Envía un mensaje para comenzar a chatear con el asistente de IA</p>
              </div>
            </div>
          )}

          {messages.map((message, index) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-4 animate-in-up ${isUser ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] ${isUser ? 'order-1' : 'order-2'}`}>
                  {isUser ? (
                    <div className="bg-surface-container-highest text-on-surface rounded-2xl rounded-tr-sm px-5 py-4 text-[15px] leading-relaxed">
                      {renderMessageContent(message.content, 'user')}
                      <div className="text-[10px] text-on-surface-variant/60 mt-2 text-right">
                        {format(new Date(message.created_at), 'HH:mm')}
                      </div>
                    </div>
                  ) : (
                    <div className="text-on-surface px-1 py-1 text-[15px] leading-relaxed">
                      {renderMessageContent(message.content, 'assistant')}

                      {/* Feedback buttons for AI messages */}
                      <div className="flex gap-1 mt-4">
                        <button
                          aria-label="Me gusta"
                          title="Me gusta"
                          className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          aria-label="No me gusta"
                          title="No me gusta"
                          className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
                        >
                          <ThumbsDown className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          aria-label="Regenerar respuesta"
                          title="Regenerar respuesta"
                          className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="text-[10px] text-on-surface-variant/60 mt-1">
                        {format(new Date(message.created_at), 'HH:mm')}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1 order-2">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-surface-container-low rounded-2xl rounded-tl-sm px-5 py-4">
                <Loader2 className="h-5 w-5 animate-spin text-on-surface-variant" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Command Center Input */}
      <div className="p-4 bg-surface w-full flex justify-center pb-6 border-t border-transparent">
        {/* Pending file indicator */}
        {pendingFile && (
          <div className="mb-3 p-3 bg-surface-container-low rounded-lg border border-primary/20 max-w-[48rem] w-full">
            <div className="flex items-center gap-3">
              {pendingFile.preview ? (
                <img src={pendingFile.preview} alt="preview" className="h-12 w-12 object-cover rounded" />
              ) : (
                <div className="h-12 w-12 bg-surface rounded flex items-center justify-center shrink-0">
                  <FileText className="h-6 w-6 text-on-surface-variant" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">{pendingFile.file.name}</p>
                <p className="text-xs text-on-surface-variant">
                  {(pendingFile.file.size / 1024).toFixed(1)} KB • Escribe tus instrucciones abajo
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPendingFile(null)}
                aria-label="Eliminar archivo adjunto"
                title="Eliminar archivo adjunto"
                className="text-on-surface-variant hover:text-error transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-[48rem]">
          <div
            ref={inputAreaRef}
            className={`bg-surface-container-high rounded-[0.625rem] border border-outline-variant shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all flex flex-col p-2 ${
              isDragging ? 'bg-primary/10 border-primary' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={isMobile ? 'Escribe un mensaje' : pendingFile ? 'Escribe instrucciones para procesar el archivo...' : 'Escribe un mensaje o adjunta archivos...'}
              className="w-full bg-transparent border-none resize-none focus:ring-0 text-on-surface text-[15px] p-2 max-h-32 placeholder:text-on-surface-variant/60 focus:outline-none"
              rows={1}
              disabled={isLoading || isAnalyzingFile}
            />
            <div className="flex justify-between items-center mt-2 px-2">
              <div className="flex gap-1 items-center">
                <VoiceRecorder
                  onTranscript={(text) => {
                    setInput(text);
                    setTimeout(() => {
                      onSendMessage(text, undefined, true);
                      setInput('');
                    }, 100);
                  }}
                  disabled={isLoading || isAnalyzingFile}
                />
                <FileUploadButton
                  onFileSelected={handleFileSelected}
                  disabled={isLoading || isAnalyzingFile}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Insertar imagen"
                  title="Insertar imagen"
                  className="text-on-surface-variant hover:text-primary"
                >
                  <ImageIcon className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-on-surface-variant font-medium hidden sm:inline-block mr-2">
                  ↵ para enviar
                </span>
                <Button
                  type="submit"
                  size="icon"
                  disabled={(!input.trim() && !pendingFile) || isLoading || isAnalyzingFile}
                  className="bg-primary text-on-primary hover:bg-primary-fixed-variant shadow-sm disabled:opacity-50"
                >
                  {isAnalyzingFile ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
