import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { Sparkles } from 'lucide-react';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterPage() {
  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to chat if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError(null);

    const { error } = await signUp(data.email, data.password);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen w-full bg-surface-container flex items-center justify-center p-4 antialiased">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col gap-8 shadow-sm animate-scale-in text-center">
          <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center mx-auto">
            <Sparkles className="text-on-primary-container w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Revisa tu correo</h1>
            <p className="text-sm text-on-surface-variant mt-2">
              Te hemos enviado un enlace de confirmación. Por favor revisa tu email para verificar tu cuenta.
            </p>
          </div>
          <Link
            to="/login"
            className="w-full py-2.5 bg-primary text-on-primary rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary-fixed-variant transition-colors"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-surface-container flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col gap-6 shadow-sm animate-scale-in">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center">
            <Sparkles className="text-on-primary-container w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Aura AI</h1>
            <p className="text-sm text-on-surface-variant">Ingresa tus datos para registrarte</p>
          </div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-on-surface" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-error">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-on-surface" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-error">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-on-surface" htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              {...register('confirmPassword', {
                required: 'Por favor confirma tu contraseña',
                validate: value => value === password || 'Las contraseñas no coinciden',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-error-container/10 border border-error/20 text-error rounded-md text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-primary text-on-primary rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary-fixed-variant transition-colors disabled:opacity-60"
          >
            {isLoading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface-container-lowest px-2 text-on-surface-variant">o</span>
          </div>
        </div>

        {/* Google OAuth Placeholder */}
        <button
          type="button"
          onClick={() => console.log('Google OAuth clicked - implementar con supabase.auth.signInWithOAuth({ provider: "google" })')}
          className="w-full py-2.5 bg-surface-container-high border border-outline-variant text-on-surface rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </button>

        <div className="text-center pt-2 border-t border-surface-variant">
          <p className="text-sm text-on-surface-variant">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-primary hover:text-primary-fixed-variant font-medium transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
