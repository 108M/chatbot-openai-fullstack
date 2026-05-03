import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';


declare global {
  interface Window {
    ElevenLabs?: {
      ConvaiClient: new (config: any) => {
        startSession: () => void;
        endSession: () => void;
      };
    };
  }
}

export function ElevenLabsAgentWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<any>(null);

  useEffect(() => {
    const agentId = (import.meta.env?.VITE_ELEVENLABS_AGENT_ID as string) || '';
    const apiKey = (import.meta.env?.VITE_ELEVENLABS_API_KEY as string) || '';
    let script: HTMLScriptElement | null = null;

    const initializeAgent = () => {
      try {
        if (!agentId || !apiKey) {
          throw new Error('Missing ELEVENLABS credentials. Check VITE_ELEVENLABS_AGENT_ID and VITE_ELEVENLABS_API_KEY in environment.');
        }

        // Load Eleven Labs ConvAI SDK
        script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@elevenlabs/convai@latest/dist/index.min.js';
        script.async = true;
        script.onload = () => {
          try {
            // Access global ElevenLabs from window
            const ElevenLabs = (window as any).ElevenLabs;
            if (!ElevenLabs?.ConvaiClient) {
              throw new Error('ElevenLabs SDK not loaded correctly');
            }

            // Create and initialize the client
            const client = new ElevenLabs.ConvaiClient({
              publicKey: apiKey,
              agentId: agentId,
              onMessage: (message: any) => {
                console.log('Agent message:', message);
              },
              onError: (error: any) => {
                console.error('Agent error:', error);
                setError(`Agent error: ${error.message || String(error)}`);
              },
              onConnect: () => {
                console.log('Agent connected');
                setIsLoading(false);
                setError(null);
              },
              onDisconnect: () => {
                console.log('Agent disconnected');
              }
            });

            clientRef.current = client;
            client.startSession();
          } catch (err: any) {
            console.error('Failed to initialize ElevenLabs:', err);
            setError(`Failed to initialize: ${err.message}`);
            setIsLoading(false);
          }
        };

        script.onerror = () => {
          setError('Failed to load ElevenLabs SDK');
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } catch (err: any) {
        console.error('Failed to initialize:', err);
        setError(`Failed to initialize: ${err.message}`);
        setIsLoading(false);
      }
    };

    initializeAgent();

    return () => {
      // Cleanup: end session if exists
      if (clientRef.current?.endSession) {
        try {
          clientRef.current.endSession();
        } catch (e) {
          console.warn('Error ending session:', e);
        }
      }
      // Remove script
      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleEndSession = () => {
    if (clientRef.current?.endSession) {
      clientRef.current.endSession();
      setIsLoading(true);
    }
  };

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-destructive/10 p-6">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <p className="text-xs text-muted-foreground mb-6">
            In Vercel: Project Settings → Environment Variables → Add VITE_ELEVENLABS_AGENT_ID and VITE_ELEVENLABS_API_KEY, then redeploy.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Agente de Voz en Tiempo Real</h1>
          <p className="text-sm text-muted-foreground">
            {isLoading ? 'Conectando...' : 'Conectado - Haz clic en el micrófono'}
          </p>
        </div>
        {!isLoading && (
          <Button variant="outline" onClick={handleEndSession}>
            Terminar Sesión
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col items-center justify-center p-6"
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Inicializando agente...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-6 p-8 bg-primary/10 rounded-lg">
              <p className="text-lg font-medium mb-2">Micrófono Activo</p>
              <p className="text-sm text-muted-foreground">
                Habla ahora. El agente te escuchará y responderá automáticamente.
              </p>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>✓ Reconocimiento de voz en tiempo real</p>
              <p>✓ Respuestas con IA integrada</p>
              <p>✓ Generación de voz natural</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t bg-card p-4 text-center text-xs text-muted-foreground">
        Powered by Eleven Labs ConvAI
      </div>
    </div>
  );
}
