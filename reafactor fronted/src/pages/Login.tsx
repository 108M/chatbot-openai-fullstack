import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Login() {
  return (
    <div className="min-h-screen bg-surface-container flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col gap-8 shadow-sm">
        
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center">
            <Sparkles className="text-on-primary-container w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-h2 text-2xl font-semibold text-on-surface tracking-tight">Aura AI</h1>
            <p className="font-body-chat text-sm text-on-surface-variant">Inicia sesión en tu cuenta para continuar</p>
          </div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-xs font-medium text-on-surface" htmlFor="email">
              Correo electrónico
            </label>
            <input 
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-main text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
              id="email" 
              placeholder="nombre@empresa.com" 
              type="email" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="font-label-sm text-xs font-medium text-on-surface" htmlFor="password">
                Contraseña
              </label>
              <a className="font-label-sm text-xs font-medium text-primary hover:text-primary-fixed-variant transition-colors" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input 
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-main text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" 
              id="password" 
              placeholder="••••••••" 
              type="password" 
            />
          </div>

          <Link to="/chat" className="w-full mt-2 py-2.5 bg-primary text-on-primary rounded-lg font-label-sm text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary-fixed-variant transition-colors">
            Iniciar sesión
            <ArrowRight className="w-4 h-4" />
          </Link>
        </form>

        <div className="text-center pt-6 border-t border-surface-variant">
          <p className="font-body-chat text-sm text-on-surface-variant">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-primary hover:text-primary-fixed-variant font-medium transition-colors">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
