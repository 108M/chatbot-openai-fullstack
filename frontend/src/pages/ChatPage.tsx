import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Settings, Upload, Volume2, X, Menu, Search, MoreHorizontal, Mic,
  PlusCircle, MessageSquare, HelpCircle, UserCircle, Radio, PhoneCall,
  Plus, Trash2, Loader2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import { useChatStore } from '../store/chatStore';
import { ChatWindow } from '../components/ChatWindow';
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
import { supabase } from '../lib/supabaseClient';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

 type Panel = 'none' | 'upload' | 'tts' | 'embeddings' | 'prompt';

export function ChatPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activePanel, setActivePanel] = useState<Panel>('none');
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1280 : true);
  const [isNewChatMode, setIsNewChatMode] = useState(false);

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
      loadSession(sessions[0]!.id);
    }
  }, [isLoadingSessions, sessions.length, currentSession, loadSession]);

  const handleSelectSession = (sessionId: string) => {
    loadSession(sessionId);
    if (window.innerWidth < 1280) setSidebarOpen(false);
  };

  const handleSendMessage = async (content: string, sessionIdOverride?: string, enableVoice: boolean = false) => {
    if ((isNewChatMode || !currentSession) && user?.id) {
      const newSession = await createSession(user.id);
      setIsNewChatMode(false);
      if (newSession) {
        sendMessage(content, newSession.id, enableVoice);
      }
    } else if (currentSession) {
      sendMessage(content, currentSession.id, enableVoice);
    }
  };

  const handleCreateSession = async () => {
    setIsNewChatMode(true);
    if (window.innerWidth < 1280) setSidebarOpen(false);
  };

  const handleDeleteSession = async (sessionId: string) => {
    await deleteSession(sessionId);
  };

  const handleAnalysisComplete = async (result: string, type: 'image' | 'file', responseSessionId?: string) => {
    if (!currentSession && !isNewChatMode && !responseSessionId) return;

    let sessionToUse = currentSession;
    if (isNewChatMode && user?.id) {
      sessionToUse = await createSession(user.id);
      setIsNewChatMode(false);
    }

    if (responseSessionId && !sessionToUse) {
      if (user?.id) {
        await loadSessions(user.id);
        sessionToUse = { id: responseSessionId, title: 'Nueva conversación' } as any;
      }
    }

    if (!sessionToUse) return;

    const content = type === 'image'
      ? `**Image Analysis:**\n\n${result}`
      : `**File Analysis:**\n\n${result}`;

    const analysisMessage: Message = {
      id: `analysis-${Date.now()}`,
      session_id: sessionToUse.id,
      role: 'assistant',
      content: content,
      created_at: new Date().toISOString(),
    };
    addMessage(analysisMessage);

    try {
      await supabase.rpc('add_message', {
        p_session_id: sessionToUse.id,
        p_message: {
          id: 1,
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

  // Group sessions by relative date
  const groupSessions = () => {
    const groups: { label: string; sessions: typeof sessions }[] = [];
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    const yesterdayStr = format(new Date(today.getTime() - 86400000), 'yyyy-MM-dd');

    const todaySessions = sessions.filter(s => format(new Date(s.created_at), 'yyyy-MM-dd') === todayStr);
    const yesterdaySessions = sessions.filter(s => format(new Date(s.created_at), 'yyyy-MM-dd') === yesterdayStr);
    const olderSessions = sessions.filter(s => {
      const d = format(new Date(s.created_at), 'yyyy-MM-dd');
      return d !== todayStr && d !== yesterdayStr;
    });

    if (todaySessions.length) groups.push({ label: 'Hoy', sessions: todaySessions });
    if (yesterdaySessions.length) groups.push({ label: 'Ayer', sessions: yesterdaySessions });
    if (olderSessions.length) groups.push({ label: 'Anteriores', sessions: olderSessions });

    return groups;
  };

  const sessionGroups = groupSessions();

  return (
    <div className="h-screen flex overflow-hidden bg-surface">
      {/* Left Sidebar */}
      {sidebarOpen && (
        <>
          {/* Mobile overlay */}
          <div className="xl:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50 transition-opacity duration-200" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-[260px] bg-surface-container-low border-r border-outline-variant animate-in-left">
              <SidebarContent
                userEmail={user?.email || ''}
                sessionGroups={sessionGroups}
                currentSessionId={currentSession?.id || null}
                isLoading={isLoadingSessions}
                onSelectSession={handleSelectSession}
                onCreateSession={handleCreateSession}
                onDeleteSession={handleDeleteSession}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
          {/* Desktop sidebar */}
          <div className="hidden xl:flex xl:w-[260px] xl:flex-col border-r border-outline-variant bg-surface-container-low flex-shrink-0">
            <SidebarContent
              userEmail={user?.email || ''}
              sessionGroups={sessionGroups}
              currentSessionId={currentSession?.id || null}
              isLoading={isLoadingSessions}
              onSelectSession={handleSelectSession}
              onCreateSession={handleCreateSession}
              onDeleteSession={handleDeleteSession}
            />
          </div>
        </>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-surface relative min-w-0">
        {/* Header */}
        <header className="flex justify-between items-center h-14 px-6 w-full sticky top-0 z-10 bg-surface border-b border-outline-variant">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Alternar lateral"
              title="Alternar lateral"
              className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-md transition-colors"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <h1 className="text-lg font-semibold tracking-tight text-on-surface">
              {currentSession?.title || (isNewChatMode ? 'Nueva conversación' : 'Aura AI')}
            </h1>
            <div className="flex items-center gap-2 px-2 py-1 bg-surface-container-high rounded-full">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse-glow' : 'bg-red-500'}`}></div>
              <span className="text-xs text-on-surface-variant font-medium">GPT-4 Turbo</span>
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/voice')}
              className="flex hover:scale-105 active:scale-95 transition-all duration-200 border-primary/50 bg-primary/5"
            >
              <PhoneCall className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Agente</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => togglePanel(activePanel === 'prompt' ? 'none' : 'prompt')}
              className="border bg-background shadow-xs h-8 rounded-md flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              title="Editar System Prompt"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <div className="h-6 w-px bg-outline-variant mx-2 hidden xl:block" />
            <span className="text-sm text-on-surface-variant hidden xl:inline">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={signOut} aria-label="Cerrar sesión" className="hover:bg-error-container/10 hover:text-error transition-colors duration-200">
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Mobile overflow menu */}
          <div className="flex md:hidden items-center ml-auto gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Más opciones">
                  <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => togglePanel('upload')}>Subir archivo</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => togglePanel('embeddings')}>Documentos</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => togglePanel('tts')}>TTS</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate('/voice')}>
                  <Mic className="h-4 w-4 mr-2" />
                  Agente en Vivo
                </DropdownMenuItem>
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

        {/* Content area */}
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

          {/* Right panel (desplegable) */}
          {activePanel !== 'none' && activePanel !== 'prompt' && (
            <div className="fixed inset-0 z-50 flex md:static md:inset-auto md:z-auto w-full h-full md:w-96 md:h-auto border-l border-outline-variant bg-surface flex-col max-h-full transform transition-all duration-300 ease-in-out shadow-2xl md:shadow-none">
              <div className="p-3 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
                <h3 className="font-medium text-on-surface">
                  {activePanel === 'upload' ? 'Subir archivo' : activePanel === 'tts' ? 'Texto a voz' : 'Búsqueda de Documentos'}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActivePanel('none')}
                  aria-label="Cerrar panel"
                  title="Cerrar panel"
                  className="hover:bg-surface-container-high transition-colors duration-200"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto transition-opacity duration-500 delay-150">
                {activePanel === 'upload' && (
                  <FileUploader
                    onAnalysisComplete={handleAnalysisComplete}
            sessionId={isNewChatMode ? null : (currentSession?.id ?? null)}
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
            sessionId={isNewChatMode ? null : (currentSession?.id ?? null)}
            onClose={() => setActivePanel('none')}
          />
        )}

        {chatError && (
          <div className="bg-error-container/10 border-t border-error/20 px-4 py-2 text-error text-sm">
            {chatError}
          </div>
        )}
      </main>
    </div>
  );
}

/* Sidebar sub-component */
interface SidebarContentProps {
  userEmail: string;
  sessionGroups: { label: string; sessions: any[] }[];
  currentSessionId: string | null;
  isLoading: boolean;
  onSelectSession: (id: string) => void;
  onCreateSession: () => void;
  onDeleteSession: (id: string) => void;
  onClose?: () => void;
}

function SidebarContent({
  userEmail,
  sessionGroups,
  currentSessionId,
  isLoading,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  onClose,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full py-4 px-3 gap-2 text-on-surface">
      {/* User header */}
      <div className="mb-6 px-3">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
            {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-on-surface truncate">Aura Workspace</h2>
            <p className="text-xs text-on-surface-variant truncate">{userEmail || 'Pro Plan'}</p>
          </div>
        </div>
      </div>

      {/* New Chat button */}
      <button
        onClick={() => { onCreateSession(); onClose?.(); }}
        className="flex items-center gap-3 w-full text-left bg-surface-variant text-on-surface rounded-md px-3 py-2 transition-all hover:bg-surface-container-highest group"
      >
        <PlusCircle className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Nuevo chat</span>
      </button>

      {/* Sessions list */}
      <nav className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1 mt-2">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-5 w-5 animate-spin text-on-surface-variant" />
          </div>
        ) : sessionGroups.length === 0 ? (
          <div className="p-4 text-center text-on-surface-variant text-sm">
            No hay conversaciones aún
          </div>
        ) : (
          sessionGroups.map((group) => (
            <div key={group.label}>
              <div className="mt-4 mb-2 px-3">
                <span className="text-on-surface-variant uppercase tracking-wider text-xs font-semibold">
                  {group.label}
                </span>
              </div>
              {group.sessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all ${
                    currentSessionId === session.id
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
                  }`}
                  onClick={() => { onSelectSession(session.id); onClose?.(); }}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate flex-1">{session.title || 'Nueva conversación'}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-outline-variant pt-2">
        <button className="flex items-center gap-3 w-full text-left text-on-surface-variant rounded-md px-3 py-2 transition-all hover:bg-surface-container-highest">
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm">Ayuda</span>
        </button>
        <button className="flex items-center gap-3 w-full text-left text-on-surface-variant rounded-md px-3 py-2 transition-all hover:bg-surface-container-highest">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Ajustes</span>
        </button>
      </div>
    </div>
  );
}
