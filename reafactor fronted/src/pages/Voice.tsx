import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, PhoneOff, Mic } from 'lucide-react';
import { motion } from 'motion/react';

export function Voice() {
  const bars = [15, 25, 45, 30, 60, 85, 100, 75, 40, 90, 65, 35, 50, 20, 10];
  
  return (
    <div className="bg-background text-on-background min-h-screen w-full flex flex-col font-body-main overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Floating Navigation & Status Shell */}
      <header className="absolute top-0 left-0 w-full px-6 py-6 flex justify-between items-start z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Link to="/chat" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-label-sm text-sm font-medium">Volver al chat</span>
          </Link>
        </div>
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
            {/* Connection Status Indicator */}
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            <span className="font-label-sm text-sm font-medium text-on-surface">Aura Voice</span>
          </div>
          <span className="font-label-sm text-xs font-medium text-outline px-2">Alimentado por ElevenLabs</span>
        </div>
      </header>

      {/* Main Canvas: Audio Visualization & State */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-24">
          <h1 className="font-h1 text-4xl font-semibold tracking-tight text-on-surface">Escuchando...</h1>
          <p className="font-body-main text-on-surface-variant max-w-md mx-auto">
            Habla de forma natural. El micrófono se silenciará automáticamente al procesar.
          </p>
        </div>

        {/* Simulated Reactive Audio Waves */}
        <div className="flex items-center justify-center gap-[6px] h-40 w-full px-8">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: [`${h}%`, `${Math.max(15, h - 40)}%`, `${h}%`] }}
              transition={{ repeat: Infinity, duration: 1.5 + (i % 2) * 0.5, delay: i * 0.05, ease: "easeInOut" }}
              className={`w-2 rounded-full ${
                i % 2 === 0 ? 'bg-primary' : 'bg-primary-fixed-dim'
              }`}
            />
          ))}
        </div>
      </main>

      {/* Bottom Action Controls */}
      <footer className="absolute bottom-16 left-0 w-full flex justify-center items-center gap-8 z-50">
        <button className="w-14 h-14 rounded-full bg-surface-container-high border border-outline-variant/20 text-on-surface-variant flex items-center justify-center hover:bg-surface-container-highest hover:text-on-surface transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
          <Volume2 className="w-6 h-6" />
        </button>

        <Link to="/chat" className="w-24 h-24 rounded-[2rem] bg-error text-on-error flex items-center justify-center hover:bg-[#93000a] transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-error-container focus:ring-offset-4 focus:ring-offset-background group active:scale-95 duration-150">
          <PhoneOff className="w-10 h-10 group-active:scale-95 transition-transform" />
        </Link>

        <button className="w-14 h-14 rounded-full bg-surface-container-high border border-outline-variant/20 text-on-surface flex items-center justify-center hover:bg-surface-container-highest transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background relative">
          <Mic className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-background rounded-full flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </span>
        </button>
      </footer>
    </div>
  );
}
