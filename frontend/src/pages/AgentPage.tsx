import { Button } from '../components/ui/button';
import { ElevenLabsAgentWidget } from '../components/ElevenLabsAgentWidget';
import { useAuth } from '../hooks/useAuth';

interface AgentPageProps {
  onBack?: () => void;
}

export function AgentPage({ onBack }: AgentPageProps) {
  const { signOut } = useAuth();

  return (
    <div className="w-screen h-screen flex">
      {/* Agent Widget */}
      <div className="flex-1">
        <ElevenLabsAgentWidget />
      </div>

      {/* Side Navigation */}
      <div className="fixed bottom-6 left-6 space-y-2">
        {onBack && (
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="w-full"
          >
            ← Volver al Chat
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut()}
          className="w-full"
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
