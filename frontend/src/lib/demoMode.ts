import type { SupabaseClient } from '@supabase/supabase-js';

const DEMO_USER_KEY = 'aura_demo_user';
const DEMO_SESSION_KEY = 'aura_demo_session';

export const isDemoMode = true; // Siempre activo para testing fácil

export function getDemoUser() {
  try {
    const raw = localStorage.getItem(DEMO_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setDemoUser(email: string) {
  const user = {
    id: 'demo-user-id',
    email,
    created_at: new Date().toISOString(),
  };
  const session = {
    access_token: 'demo-token',
    refresh_token: 'demo-refresh',
    user,
    expires_at: Date.now() + 86400000,
  };
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
  localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
  return { user, session };
}

export function clearDemoUser() {
  localStorage.removeItem(DEMO_USER_KEY);
  localStorage.removeItem(DEMO_SESSION_KEY);
}

export function createMockSupabase(): SupabaseClient<any, 'public', any> {
  return {
    auth: {
      getSession: async () => {
        const session = getDemoSession();
        return { data: { session }, error: null };
      },
      onAuthStateChange: (callback: any) => {
        return {
          data: { subscription: { unsubscribe: () => {} } },
        };
      },
      signInWithPassword: async ({ email, password }: any) => {
        const { user, session } = setDemoUser(email);
        return { data: { user, session }, error: null };
      },
      signUp: async ({ email, password }: any) => {
        const { user, session } = setDemoUser(email);
        return { data: { user, session }, error: null };
      },
      signOut: async () => {
        clearDemoUser();
        return { error: null };
      },
    },
    rpc: async () => ({ data: null, error: null }),
  } as any;
}

function getDemoSession() {
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
