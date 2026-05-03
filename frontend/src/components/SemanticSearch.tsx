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

  // Load documents on component mount
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
        <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {/* Tab buttons */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('search')}
          className={`pb-2 px-3 text-sm transition-all ${
            activeTab === 'search'
              ? 'border-b-2 border-blue-500 font-semibold text-gray-900 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Buscar
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-2 px-3 text-sm transition-all ${
            activeTab === 'documents'
              ? 'border-b-2 border-blue-500 font-semibold text-gray-900 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
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
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {results.length} resultado{results.length > 1 ? 's' : ''}
              </p>
              {results.map((result) => (
                <div key={result.id} className="p-2 border rounded bg-slate-50 dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-xs space-y-1">
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                    {result.content}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    {(result.similarity * 100).toFixed(0)}%
                  </p>
                </div>
              ))}
            </div>
          )}

          {results.length === 0 && query && !loading && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
              Sin resultados
            </p>
          )}
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-3 flex flex-col h-full">
          {/* Add new document */}
          <div className="space-y-2 p-3 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-gray-700">
            <label className="text-xs font-semibold text-gray-900 dark:text-white">Nuevo documento</label>
            <textarea
              className="w-full p-2 border rounded text-xs resize-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
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
                <div key={doc.id} className="p-2 border rounded bg-slate-50 dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-xs space-y-1">
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
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
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
                Sin documentos
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
