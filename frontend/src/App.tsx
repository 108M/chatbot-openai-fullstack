import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ChatPage } from './pages/ChatPage';
import { AgentPage } from './pages/AgentPage';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from 'sonner';
import './index.css';

type AuthView = 'login' | 'register';
type MainView = 'chat' | 'agent';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  const [mainView, setMainView] = useState<MainView>('chat');

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show auth pages if not authenticated
  if (!isAuthenticated) {
    if (authView === 'login') {
      return <LoginPage onSwitchToRegister={() => setAuthView('register')} />;
    }
    return <RegisterPage onSwitchToLogin={() => setAuthView('login')} />;
  }

  // Show main views if authenticated
  if (mainView === 'agent') {
    return <AgentPage onBack={() => setMainView('chat')} />;
  }

  return <ChatPage onOpenAgent={() => setMainView('agent')} />;
}

export function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>
        <AppContent />
      </AuthProvider>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}

export default App;
