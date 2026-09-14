import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

export function Register() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-[400px] bg-surface border border-outline-variant rounded-xl p-8 shadow-sm flex flex-col gap-6">
        
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="text-primary font-h2 font-bold tracking-tight flex items-center gap-2 text-xl">
            <Bot className="w-7 h-7" />
            Aura AI
          </div>
          <h1 className="font-h2 text-xl text-on-surface text-center mt-2 font-semibold">Crear una cuenta</h1>
          <p className="font-body-chat text-sm text-on-surface-variant text-center">Ingresa tus datos para registrarte</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs font-medium text-on-surface" htmlFor="name">Nombre completo</label>
            <input 
              className="flex h-10 w-full rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow" 
              id="name" 
              placeholder="Ej. Juan Pérez" 
              type="text" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs font-medium text-on-surface" htmlFor="email">Correo electrónico</label>
            <input 
              className="flex h-10 w-full rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow" 
              id="email" 
              placeholder="nombre@ejemplo.com" 
              type="email" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs font-medium text-on-surface" htmlFor="password">Contraseña</label>
            <input 
              className="flex h-10 w-full rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow" 
              id="password" 
              placeholder="••••••••" 
              type="password" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs font-medium text-on-surface" htmlFor="confirm-password">Confirmar contraseña</label>
            <input 
              className="flex h-10 w-full rounded-md border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow" 
              id="confirm-password" 
              placeholder="••••••••" 
              type="password" 
            />
          </div>

          <Link to="/chat" className="inline-flex items-center justify-center rounded-md font-label-sm text-sm font-medium h-10 px-4 py-2 mt-2 bg-primary text-on-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors w-full">
            Registrarse
          </Link>
        </form>

        <div className="text-center font-body-chat text-sm text-on-surface-variant mt-2">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary hover:underline underline-offset-4 font-medium transition-colors">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
