import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/apiClient';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  sessionId: string | null;
  onClose: () => void;
}

export function SystemPromptEditor({ sessionId, onClose }: Props) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load system prompt when component mounts or sessionId changes
  useEffect(() => {
    if (sessionId) {
      loadSystemPrompt();
    }
  }, [sessionId]);

  const loadSystemPrompt = async () => {
    if (!sessionId) return;
    
    try {
      setLoading(true);
      const response = await apiClient.getSystemPrompt(sessionId);
      setPrompt(response.prompt || '');
    } catch (err) {
      console.error('Error loading system prompt:', err);
      toast.error('Error al cargar el system prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!sessionId) return;

    try {
      setSaving(true);
      await apiClient.setSystemPrompt(sessionId, prompt);
      toast.success('System prompt guardado');
      onClose();
    } catch (err) {
      console.error('Error saving system prompt:', err);
      toast.error('Error al guardar el system prompt');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Editar System Prompt</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Cargando...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-prompt">
                  Instrucciones del Sistema
                </Label>
                <Textarea
                  id="system-prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Escribe las instrucciones que deseas que el asistente siga. Por ejemplo: 'Eres un experto en Python...' o 'Responde siempre en español formal...'"
                  className="min-h-[300px] resize-none"
                />
              </div>

              <div className="bg-muted/50 p-3 rounded text-sm text-muted-foreground">
                <p className="font-medium mb-1">💡 Consejos:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Define el rol del asistente (ej: "Eres un profesor de matemáticas")</li>
                  <li>Especifica el tono y estilo de respuesta</li>
                  <li>Establece restricciones si es necesario</li>
                  <li>El system prompt se aplicará a todas las respuestas de esta sesión</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>
    </div>
  );
}
