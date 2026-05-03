import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import type { Session } from '../types';
import { format } from 'date-fns';

interface Props {
  sessions: Session[];
  currentSessionId: string | null;
  isLoading: boolean;
  onSelectSession: (sessionId: string) => void;
  onCreateSession: () => void;
  onDeleteSession: (sessionId: string) => void;
  onClose?: () => void;
  onRenameSession?: (sessionId: string, title: string) => Promise<void> | void;
}

export function HistorySidebar({
  sessions,
  currentSessionId,
  isLoading,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  onClose,
  onRenameSession,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);
  return (
    <div className="w-full lg:w-64 text-sidebar-foreground flex flex-col h-full">
      {/* Header */}
      <div className="px-4 h-12 border-b border-sidebar-border flex items-center gap-2">
        <Button
          onClick={onCreateSession}
          size="icon"
          className="shrink-0 size-9 bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground hover:text-sidebar-foreground transition-smooth hover:scale-[1.05] active:scale-[0.95] cursor-pointer"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <span className="font-medium text-sm text-sidebar-foreground">Nuevo chat</span>
      </div>

      {/* Sessions list */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-5 w-5 animate-spin text-sidebar-foreground/50" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-4 text-center text-sidebar-foreground/50 text-sm">
            No conversations yet
          </div>
        ) : (
          <div className="px-4 py-3 space-y-1">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className={cn(
                  'group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-smooth hover:scale-[1.02] animate-in-left',
                  currentSessionId === session.id
                    ? 'bg-sidebar-accent shadow-sm'
                    : 'hover:bg-sidebar-accent/50'
                )}
                style={{ animationDelay: `${index * 30}ms` }}
                onClick={() => {
                  onSelectSession(session.id);
                  onClose?.();
                }}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0 text-sidebar-foreground/70" />
                <div className="flex-1 min-w-0">
                  {editingId === session.id ? (
                    <input
                      ref={inputRef}
                      className="w-full text-sm text-sidebar-foreground bg-transparent outline-none"
                      value={titleInput}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setTitleInput(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const newTitle = titleInput.trim() || 'Nueva conversación';
                          setEditingId(null);
                          if (onRenameSession) await onRenameSession(session.id, newTitle);
                        } else if (e.key === 'Escape') {
                          setEditingId(null);
                        }
                      }}
                      onBlur={async () => {
                        setEditingId(null);
                        const newTitle = titleInput.trim() || 'Nueva conversación';
                        if (onRenameSession) await onRenameSession(session.id, newTitle);
                      }}
                    />
                  ) : (
                    <p
                      className="text-sm truncate text-sidebar-foreground cursor-text"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(session.id);
                        setTitleInput(session.title || '');
                      }}
                    >
                      {session.title || 'New conversation'}
                    </p>
                  )}
                  <p className="text-xs text-sidebar-foreground/50">
                    {format(new Date(session.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-sidebar-accent/80 transition-smooth hover:scale-125"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                >
                  <Trash2 className="h-3 w-3 text-sidebar-foreground/70 hover:text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}