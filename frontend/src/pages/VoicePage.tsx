import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, PhoneOff, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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

export function VoicePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<any>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const bars = [15, 25, 45, 30, 60, 85, 100, 75, 40, 90, 65, 35, 50, 20, 10];

  useEffect(() => {
    const agentId = (import.meta.env?.VITE_ELEVENLABS_AGENT_ID as string) || '';
    const apiKey = (import.meta.env?.VITE_ELEVENLABS_API_KEY as string) || '';

    const initializeAgent = () => {
      try {
        if (!agentId || !apiKey) {
          throw new Error('Faltan credenciales de ElevenLabs. Configura VITE_ELEVENLABS_AGENT_ID y VITE_ELEVENLABS_API_KEY.');
        }

        const script = document.createElement('script');
        scriptRef.current = script;
        script.src = 'https://cdn.jsdelivr.net/npm/@elevenlabs/convai@latest/dist/index.min.js';
        script.async = true;
        script.onload = () => {
          try {
            const ElevenLabs = (window as any).ElevenLabs;
            if (!ElevenLabs?.ConvaiClient) {
              throw new Error('SDK de ElevenLabs no cargado correctamente');
            }

            const client = new ElevenLabs.ConvaiClient({
              publicKey: apiKey,
              agentId: agentId,
              onMessage: (message: any) => {
                console.log('Agent message:', message);
              },
              onError: (error: any) => {
                console.error('Agent error:', error);
                setError(`Error del agente: ${error.message || String(error)}`);
              },
              onConnect: () => {
                console.log('Agent connected');
                setIsLoading(false);
                setIsConnected(true);
                setError(null);
              },
              onDisconnect: () => {
                console.log('Agent disconnected');
                setIsConnected(false);
              }
            });

            clientRef.current = client;
            client.startSession();
          } catch (err: any) {
            console.error('Failed to initialize ElevenLabs:', err);
            setError(`Error al inicializar: ${err.message}`);
            setIsLoading(false);
          }
        };

        script.onerror = () => {
          setError('Error al cargar el SDK de ElevenLabs');
          setIsLoading(false);
        };

        document.head.appendChild(script);
      } catch (err: any) {
        console.error('Failed to initialize:', err);
        setError(`Error al inicializar: ${err.message}`);
        setIsLoading(false);
      }
    };

    initializeAgent();

    return () => {
      if (clientRef.current?.endSession) {
        try {
          clientRef.current.endSession();
        } catch (e) {
          console.warn('Error ending session:', e);
        }
      }
      if (scriptRef.current?.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, []);

  const handleEndSession = () => {
    if (clientRef.current?.endSession) {
      clientRef.current.endSession();
    }
    navigate('/chat');
  };

  if (error) {
    return (
      <div className="bg-background text-on-background min-h-screen w-full flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-bold text-error mb-2">Error</h2>
          <p className="text-sm text-on-surface-variant mb-4">{error}</p>
          <Link
            to="/chat"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-fixed-variant transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al chat
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen w-full flex flex-col font-body-main overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Floating Navigation & Status Shell */}
      <header className="absolute top-0 left-0 w-full px-6 py-6 flex justify-between items-start z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Link
            to="/chat"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver al chat</span>
          </Link>
        </div>
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
            <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse-glow' : 'bg-yellow-500'}`}></div>
            <span className="text-sm font-medium text-on-surface">Aura Voice</span>
          </div>
          <span className="text-xs font-medium text-outline px-2">Alimentado por ElevenLabs</span>
        </div>
      </header>

      {/* Main Canvas: Audio Visualization & State */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-24">
          <h1 className="text-4xl font-semibold tracking-tight text-on-surface">
            {isLoading ? 'Conectando...' : isConnected ? 'Escuchando...' : 'Desconectado'}
          </h1>
          <p className="text-on-surface-variant max-w-md mx-auto">
            {isLoading
              ? 'Inicializando agente de voz...'
              : 'Habla de forma natural. El micrófono se silenciará automáticamente al procesar.'}
          </p>
        </div>

        {/* Simulated Reactive Audio Waves */}
        {!isLoading && (
          <div className="flex items-center justify-center gap-[6px] h-40 w-full px-8">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [`${h}%`, `${Math.max(15, h - 40)}%`, `${h}%`] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5 + (i % 2) * 0.5,
                  delay: i * 0.05,
                  ease: 'easeInOut',
                }}
                className={`w-2 rounded-full ${i % 2 === 0 ? 'bg-primary' : 'bg-primary-fixed-dim'}`}
              />
            ))}
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
      </main>

      {/* Bottom Action Controls */}
      <footer className="absolute bottom-16 left-0 w-full flex justify-center items-center gap-8 z-50">
        <button className="w-14 h-14 rounded-full bg-surface-container-high border border-outline-variant/20 text-on-surface-variant flex items-center justify-center hover:bg-surface-container-highest hover:text-on-surface transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
          <Volume2 className="w-6 h-6" />
        </button>

        <button
          onClick={handleEndSession}
          className="w-24 h-24 rounded-[2rem] bg-error text-on-error flex items-center justify-center hover:bg-error-container transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-error-container focus:ring-offset-4 focus:ring-offset-background group active:scale-95 duration-150"
        >
          <PhoneOff className="w-10 h-10 group-active:scale-95 transition-transform" />
        </button>

        <button className="w-14 h-14 rounded-full bg-surface-container-high border border-outline-variant/20 text-on-surface flex items-center justify-center hover:bg-surface-container-highest transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background relative">
          <Mic className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-background rounded-full flex items-center justify-center">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
          </span>
        </button>
      </footer>
    </div>
  );
}
