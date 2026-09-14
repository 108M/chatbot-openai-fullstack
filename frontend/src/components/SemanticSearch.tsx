import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/apiClient';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchResult {
  id: string;
  content: string;
  similarity: number;
  created_at?: string;
}

export function SemanticSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'documents'>('search');
  const [addingDocument, setAddingDocument] = useState(false);
  const [documentContent, setDocumentContent] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await apiClient.getDocuments();
      setDocuments(response.documents);
    } catch (err) {
      console.error('Error loading documents:', err);
      setError('Error al cargar documentos');
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Por favor ingresa una consulta');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.searchDocuments(query);
      setResults(response.results);
    } catch (err) {
      console.error('Search error:', err);
      setError('Error al realizar la búsqueda');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDocument = async () => {
    if (!documentContent.trim()) {
      setError('Por favor ingresa contenido para el documento');
      return;
    }

    setAddingDocument(true);
    setError(null);

    try {
      const response = await apiClient.addDocument(documentContent);
      setDocumentContent('');
      setError(null);
      loadDocuments();
      alert('Documento agregado exitosamente');
    } catch (err) {
      console.error('Error adding document:', err);
      setError('Error al agregar el documento');
    } finally {
      setAddingDocument(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este documento?')) {
      return;
    }

    try {
      await apiClient.deleteDocument(documentId);
      loadDocuments();
    } catch (err) {
      console.error('Error deleting document:', err);
      setError('Error al eliminar el documento');
    }
  };

  return (
    <div className="w-full flex flex-col h-full gap-4">
      {error && (
        <div className="p-3 bg-error-container/20 text-error rounded text-sm">
          {error}
        </div>
      )}

      {/* Tab buttons */}
      <div className="flex gap-2 border-b border-outline-variant">
        <button
          onClick={() => setActiveTab('search')}
          className={`pb-2 px-3 text-sm transition-all ${
            activeTab === 'search'
              ? 'border-b-2 border-primary font-semibold text-on-surface'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Buscar
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-2 px-3 text-sm transition-all ${
            activeTab === 'documents'
              ? 'border-b-2 border-primary font-semibold text-on-surface'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Docs ({documents.length})
        </button>
      </div>

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div className="space-y-3 flex flex-col h-full">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="text-sm"
            />
            <Button onClick={handleSearch} disabled={loading} size="sm">
              {loading ? '...' : 'OK'}
            </Button>
          </div>

          {results.length > 0 && (
            <div className="space-y-2 overflow-y-auto flex-1">
              <p className="text-xs text-on-surface-variant">
                {results.length} resultado{results.length > 1 ? 's' : ''}
              </p>
              {results.map((result) => (
                <div key={result.id} className="p-2 border rounded bg-surface-container-low border-outline-variant text-xs space-y-1">
                  <p className="text-on-surface-variant line-clamp-3">
                    {result.content}
                  </p>
                  <p className="text-primary font-semibold">
                    {(result.similarity * 100).toFixed(0)}%
                  </p>
                </div>
              ))}
            </div>
          )}

          {results.length === 0 && query && !loading && (
            <p className="text-center text-on-surface-variant text-sm py-4">
              Sin resultados
            </p>
          )}
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-3 flex flex-col h-full">
          {/* Add new document */}
          <div className="space-y-2 p-3 bg-surface-container-low rounded border border-outline-variant">
            <label className="text-xs font-semibold text-on-surface">Nuevo documento</label>
            <textarea
              className="w-full p-2 border rounded text-xs resize-none bg-surface-container-lowest text-on-surface placeholder:text-outline border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Pega el contenido aquí..."
              value={documentContent}
              onChange={(e) => setDocumentContent(e.target.value)}
              rows={3}
            />
            <Button
              onClick={handleAddDocument}
              disabled={addingDocument || !documentContent.trim()}
              className="w-full text-xs h-8"
              size="sm"
            >
              {addingDocument ? 'Agregando...' : 'Agregar'}
            </Button>
          </div>

          {/* List documents */}
          <div className="space-y-2 overflow-y-auto flex-1">
            {documents.length > 0 ? (
              documents.map((doc) => (
                <div key={doc.id} className="p-2 border rounded bg-surface-container-low border-outline-variant text-xs space-y-1">
                  <p className="text-on-surface-variant line-clamp-2">
                    {doc.content}
                  </p>
                  <Button
                    onClick={() => handleDeleteDocument(doc.id)}
                    variant="destructive"
                    size="sm"
                    className="w-full text-xs h-7"
                  >
                    Eliminar
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-on-surface-variant text-sm py-4">
                Sin documentos
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
