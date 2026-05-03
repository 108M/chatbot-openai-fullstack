import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

interface LoginForm {
  email: string;
  password: string;
}

interface Props {
  onSwitchToRegister: () => void;
}

export function LoginPage({ onSwitchToRegister }: Props) {
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);
    
    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">¡Bienvenido de vuelta!</CardTitle>
          <CardDescription>Inicia sesión en tu cuenta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2 animate-in-up" style={{ animationDelay: '50ms' }}>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tú@ejemplo.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2 animate-in-up" style={{ animationDelay: '100ms' }}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-primary hover:underline font-medium"
            >
              Regístrate
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
