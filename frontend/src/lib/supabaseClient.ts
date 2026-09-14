import { createClient } from '@supabase/supabase-js';
import { createMockSupabase } from './demoMode';

// Helper seguro para leer variables de entorno (funciona en Vite, Bun, o sin bundler)
function getEnv(): Record<string, string | undefined> {
  try {
    const env = (import.meta as any).env;
    return env || {};
  } catch {
    return {};
  }
}

const env = getEnv();
const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || '';

const hasCredentials = supabaseUrl && supabaseAnonKey;

if (!hasCredentials) {
  console.warn('[AURA] Modo demo activado — configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para conectar con el backend real.');
}

export const supabase = hasCredentials
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : createMockSupabase();
