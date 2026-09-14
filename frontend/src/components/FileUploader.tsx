import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { apiClient } from '../lib/apiClient';
import { cn } from '../lib/utils';

interface Props {
  onAnalysisComplete: (result: string, type: 'image' | 'file', sessionId?: string) => void;
  sessionId?: string | null;
}

interface SelectedFile {
  file: File;
  preview?: string;
  type: 'image' | 'file';
  id: string;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_EXTENSIONS = ['.txt', '.pdf', '.png', '.jpg', '.jpeg'];

export function FileUploader({ onAnalysisComplete, sessionId }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [prompt, setPrompt] = useState('');

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return 'File is too large. Max size is 50MB.';
    }

    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`;
    }

    return null;
  };

  const handleFile = useCallback((file: File) => {
    setError(null);
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (selectedFiles.some(f => f.file.name === file.name && f.file.size === file.size)) {
      setError('This file is already selected');
      return;
    }

    const isImage = file.type.startsWith('image/');
    const fileId = `${file.name}-${Date.now()}`;
    
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFiles(prev => [...prev, {
          file,
          preview: e.target?.result as string,
          type: 'image',
          id: fileId,
        }]);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFiles(prev => [...prev, {
        file,
        type: 'file',
        id: fileId,
      }]);
    }
  }, [selectedFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => handleFile(file));
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const files = selectedFiles.map(sf => sf.file);
      const response = await apiClient.analyzeMultiple(files, prompt || undefined, sessionId || undefined);
      
      const successCount = response.results.filter((r: any) => r.status === 'success').length;
      if (successCount > 0) {
        const analyses = response.results
          .filter((r: any) => r.status === 'success')
          .map((r: any) => `**${r.filename}** (${r.type}): ${r.analysis}`)
          .join('\n\n');
        
        const responseSessionId = response.session_id;
        onAnalysisComplete(analyses, 'file', responseSessionId);
      }
      
      const errorResults = response.results.filter((r: any) => r.status === 'error');
      if (errorResults.length > 0) {
        const errorMsg = errorResults.map((r: any) => `${r.filename}: ${r.error}`).join('\n');
        setError(`Some files failed:\n${errorMsg}`);
      }
      
      setSelectedFiles([]);
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze files');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = (id: string) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearAll = () => {
    setSelectedFiles([]);
    setPrompt('');
    setError(null);
  };

  return (
    <div className="p-4 border-t border-outline-variant bg-surface-container-low">
      {selectedFiles.length === 0 ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
            isDragging ? 'border-primary bg-primary-container/10' : 'border-outline-variant hover:border-outline'
          )}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept={ALLOWED_EXTENSIONS.join(',')}
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              files.forEach(file => handleFile(file));
            }}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-8 w-8 mx-auto text-on-surface-variant mb-2" />
            <p className="text-sm text-on-surface">
              Suelta aquí o <span className="text-primary">explorar</span>
            </p>
            <p className="text-xs text-on-surface-variant mt-1">
              Soporta múltiples archivos: TXT, PDF, PNG, JPG (máx 50MB cada uno)
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {selectedFiles.map(selectedFile => (
              <div key={selectedFile.id} className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-lg border border-outline-variant">
                {selectedFile.type === 'image' && selectedFile.preview ? (
                  <img 
                    src={selectedFile.preview} 
                    alt="Preview" 
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : (
                  <div className="h-12 w-12 bg-surface-container-high rounded flex items-center justify-center shrink-0">
                    {selectedFile.type === 'image' ? (
                      <ImageIcon className="h-6 w-6 text-on-surface-variant" />
                    ) : (
                      <FileText className="h-6 w-6 text-on-surface-variant" />
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-on-surface">{selectedFile.file.name}</p>
                  <p className="text-xs text-on-surface-variant">
                    {(selectedFile.file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeFile(selectedFile.id)} 
                  className="text-on-surface-variant hover:bg-error-container/20 hover:text-error transition-colors duration-200"
                  disabled={isAnalyzing}
                  aria-label="Eliminar archivo seleccionado"
                  title="Eliminar archivo seleccionado"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            ))}
          </div>

          {selectedFiles.some(f => f.type === 'image') && (
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium text-on-surface">
                Prompt para imágenes (opcional)
              </label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe las imágenes de forma detallada en español..."
                className="resize-none"
                rows={2}
                disabled={isAnalyzing}
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || selectedFiles.length === 0}
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analizando {selectedFiles.length} {selectedFiles.length === 1 ? 'archivo' : 'archivos'}...
                </>
              ) : (
                `Analizar ${selectedFiles.length} ${selectedFiles.length === 1 ? 'archivo' : 'archivos'}`
              )}
            </Button>
            <Button
              variant="outline"
              onClick={clearAll}
              disabled={isAnalyzing}
            >
              Limpiar
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 p-2 bg-error-container/20 border border-error/30 text-error rounded text-sm whitespace-pre-wrap">
          {error}
        </div>
      )}
    </div>
  );
}
