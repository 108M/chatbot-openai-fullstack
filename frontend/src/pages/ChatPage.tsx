import React, { useEffect, useState } from 'react';
import { LogOut, Settings, Upload, Volume2, X, Menu, Search, MoreHorizontal, Mic } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import { useChatStore } from '../store/chatStore';
import { ChatWindow } from '../components/ChatWindow';
import { HistorySidebar } from '../components/HistorySidebar';
import { FileUploader } from '../components/FileUploader';
import { AudioPlayer } from '../components/AudioPlayer';
import { SemanticSearch } from '../components/SemanticSearch';
import { SystemPromptEditor } from '../components/SystemPromptEditor';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/ui/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../components/ui/dropdown-menu';
import type { Message } from '../types';
import { supabase } from '../lib/supabaseClient'; // IMPORTANTE: Importar cliente supabase

type Panel = 'none' | 'upload' | 'tts' | 'embeddings' | 'prompt';

interface ChatPageProps {
  onOpenAgent?: () => void;
}

export function ChatPage({ onOpenAgent }: ChatPageProps) {
  const { user, signOut } = useAuth();
  const [activePanel, setActivePanel] = useState<Panel>('none');
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1280);
  const [isNewChatMode, setIsNewChatMode] = useState(false); // Track if in "new chat" without session
  
  const {
    sessions,
    currentSession,
    isLoadingSessions,
    loadSessions,
    loadSession,
    createSession,
    deleteSession,
    addMessage,
  } = useChatStore();
  
  const {
    messages,
    sendMessage,
    isConnected,
    isLoading: isChatLoading,
    error: chatError,
  } = useChat(currentSession?.id || null);

  useEffect(() => {
    if (user?.id) {
      loadSessions(user.id);
    }
  }, [user?.id, loadSessions]);

  useEffect(() => {
    if (!isLoadingSessions && sessions.length > 0 && !currentSession) {
      loadSession(sessions[0].id);
    }
  }, [isLoadingSessions, sessions.length, currentSession, loadSession]);

  const handleSelectSession = (sessionId: string) => {
    loadSession(sessionId);
    // En móvil, cerrar sidebar al seleccionar
    if (window.innerWidth < 1280) setSidebarOpen(false);
  };

  const handleSendMessage = async (content: string, sessionIdOverride?: string, enableVoice: boolean = false) => {
    // Create session if in new chat mode or no current session
    if ((isNewChatMode || !currentSession) && user?.id) {
      const newSession = await createSession(user.id);
      setIsNewChatMode(false);
      
      // Use the returned session directly
      if (newSession) {
        sendMessage(content, newSession.id, enableVoice);
      }
    } else if (currentSession) {
      sendMessage(content, currentSession.id, enableVoice);
    }
  };

  const handleCreateSession = async () => {
    // Only set new chat mode - don't create session in BD yet
    setIsNewChatMode(true);
    // Deselect current session
    // En móvil, cerrar sidebar
    if (window.innerWidth < 1280) setSidebarOpen(false);
  };

  const handleDeleteSession = async (sessionId: string) => {
    await deleteSession(sessionId);
  };

  // --- FUNCIÓN CORREGIDA ---
  const handleAnalysisComplete = async (result: string, type: 'image' | 'file', responseSessionId?: string) => {
    if (!currentSession && !isNewChatMode && !responseSessionId) return;
    
    // Create session if in new chat mode
    let sessionToUse = currentSession;
    if (isNewChatMode && user?.id) {
      sessionToUse = await createSession(user.id);
      setIsNewChatMode(false);
    }
    
    // If backend created a session and returned it, use that
    if (responseSessionId && !sessionToUse) {
      // Reload sessions to get the new one
      if (user?.id) {
        await loadSessions(user.id);
        sessionToUse = { id: responseSessionId, title: 'Nueva conversación' } as any;
      }
    }
    
    if (!sessionToUse) return;
    
    const content = type === 'image' 
      ? `**Image Analysis:**\n\n${result}`
      : `**File Analysis:**\n\n${result}`;

    // 1. Actualizar UI inmediatamente (Optimistic update)
    const analysisMessage: Message = {
      id: `analysis-${Date.now()}`,
      session_id: sessionToUse.id,
      role: 'assistant',
      content: content,
      created_at: new Date().toISOString(),
    };
    addMessage(analysisMessage);
    
    // 2. Guardar en Base de Datos (Persistencia)
    try {
        await supabase.rpc('add_message', {
            p_session_id: sessionToUse.id,
            p_message: {
                id: 1, // 1 = assistant
                date: new Date().toISOString(),
                msg: content
            }
        });
    } catch (error) {
        console.error("Error saving analysis to DB:", error);
    }

    setActivePanel('none');
  };

  const togglePanel = (panel: Panel) => {
    setActivePanel(activePanel === panel ? 'none' : panel);
  };

  return (
    <div className="w-screen h-screen flex bg-background">
      {/* Sidebar logic remains the same... */}
      {sidebarOpen && (
        <>
          <div className="xl:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50 transition-opacity duration-200" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-64 bg-card border-r animate-in-left">
              <HistorySidebar
                sessions={sessions}
                currentSessionId={currentSession?.id || null}
                isLoading={isLoadingSessions}
                  onSelectSession={handleSelectSession}
                  onCreateSession={handleCreateSession}
                  onDeleteSession={handleDeleteSession}
                  onRenameSession={async (sessionId: string, title: string) => {
                    // call store action to update title
                    await (await import('../store/chatStore')).useChatStore.getState().updateSessionTitle(sessionId, title);
                  }}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
          <div className="hidden xl:flex xl:w-64 xl:flex-col border-r bg-card">
            <HistorySidebar
              sessions={sessions}
              currentSessionId={currentSession?.id || null}
              isLoading={isLoadingSessions}
                onSelectSession={handleSelectSession}
                onCreateSession={handleCreateSession}
                onDeleteSession={handleDeleteSession}
                onRenameSession={async (sessionId: string, title: string) => {
                  await (await import('../store/chatStore')).useChatStore.getState().updateSessionTitle(sessionId, title);
                }}
            />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b px-4 h-12 flex items-center justify-between transition-smooth">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-accent transition-smooth cursor-pointer"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-semibold text-foreground">
                {currentSession?.title || (isNewChatMode ? 'Nueva conversación' : 'AI Chat')}
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1 transform transition-all duration-500 delay-300 ease-in-out">
                <span className={`w-2 h-2 rounded-full animate-pulse ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {isConnected ? 'Conectado' : 'Desconectado'}
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={activePanel === 'upload' ? 'default' : 'outline'}
              size="sm"
              onClick={() => togglePanel('upload')}
              className="flex hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Upload className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Subir Archivo</span>
            </Button>
            <Button
              variant={activePanel === 'embeddings' ? 'default' : 'outline'}
              size="sm"
              onClick={() => togglePanel('embeddings')}
              className="flex hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Search className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Documentos</span>
            </Button>
            <Button
              variant={activePanel === 'tts' ? 'default' : 'outline'}
              size="sm"
              onClick={() => togglePanel('tts')}
              className="flex hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Volume2 className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">TTS</span>
            </Button>
            {onOpenAgent && (
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenAgent}
                className="flex hover:scale-105 active:scale-95 transition-all duration-200 border-primary/50 bg-primary/5"
              >
                <Mic className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Agente</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => togglePanel(activePanel === 'prompt' ? 'none' : 'prompt')}
              className="border bg-background shadow-xs h-8 rounded-md flex items-center justify-center hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition-colors duration-200"
              title="Editar System Prompt"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <div className="h-6 w-px bg-border mx-2 hidden xl:block" />
            <span className="text-sm text-muted-foreground hidden xl:inline">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={signOut} className="hover:bg-destructive/10 hover:text-destructive transition-colors duration-200">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile: overflow menu */}
          <div className="flex md:hidden items-center ml-auto gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => togglePanel('upload')}>Subir archivo</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => togglePanel('embeddings')}>Documentos</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => togglePanel('tts')}>TTS</DropdownMenuItem>
                {onOpenAgent && (
                  <DropdownMenuItem onSelect={onOpenAgent}>
                    <Mic className="h-4 w-4 mr-2" />
                    Agente en Vivo
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onSelect={() => togglePanel('prompt')}>Editar system prompt</DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center w-full justify-between">
                    <span>Tema</span>
                    <ThemeToggle />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => signOut()}>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <ChatWindow
              messages={isNewChatMode ? [] : messages}
              onSendMessage={handleSendMessage}
              onAddMessage={addMessage}
              isLoading={isChatLoading}
              isConnected={isConnected}
              sessionId={isNewChatMode ? null : currentSession?.id}
              userId={user?.id}
            />
          </div>

          {activePanel !== 'none' && (
            <div className="fixed inset-0 z-50 flex md:static md:inset-auto md:z-auto w-full h-full md:w-96 md:h-auto border-l bg-card flex-col max-h-full transform transition-all duration-300 ease-in-out shadow-2xl md:shadow-none">
              <div className="p-3 border-b flex items-center justify-between">
                <h3 className="font-medium text-foreground">
                  {activePanel === 'upload' ? 'Subir archivo' : activePanel === 'tts' ? 'Texto a voz' : 'Búsqueda de Documentos'}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActivePanel('none')}
                  className="hover:bg-accent transition-colors duration-200 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto transition-opacity duration-500 delay-150">
                {activePanel === 'upload' && (
                  <FileUploader 
                    onAnalysisComplete={handleAnalysisComplete} 
                    sessionId={isNewChatMode ? null : currentSession?.id}
                  />
                )}
                {activePanel === 'embeddings' && (
                  <div className="p-4">
                    <SemanticSearch />
                  </div>
                )}
                {activePanel === 'tts' && (
                  <AudioPlayer />
                )}
              </div>
            </div>
          )}
        </div>

        {/* System Prompt Editor Modal */}
        {activePanel === 'prompt' && (
          <SystemPromptEditor 
            sessionId={isNewChatMode ? null : currentSession?.id}
            onClose={() => setActivePanel('none')}
          />
        )}

        {chatError && (
          <div className="bg-destructive/10 border-t border-destructive/20 px-4 py-2 text-destructive text-sm">
            {chatError}
          </div>
        )}
      </div>
    </div>
  );
}