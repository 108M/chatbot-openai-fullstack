import { Link, useNavigate } from 'react-router-dom';
import {
  MessageSquare, PlusCircle, Settings, HelpCircle, UserCircle,
  Radio, Copy, ThumbsUp, ThumbsDown, RotateCcw, X, Edit2, Trash2,
  TerminalSquare, SearchCode, Search, Database, FileText, Table,
  Plus, Paperclip, Mic, Image as ImageIcon, Send, Sparkles, PhoneCall
} from 'lucide-react';

export function Chat() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Left Sidebar */}
      <aside className="hidden md:flex flex-col h-full py-4 px-3 gap-2 w-[260px] border-r border-outline-variant bg-surface-container-low text-on-surface flex-shrink-0">
        <div className="mb-6 px-3">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
              U
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface">Aura Workspace</h2>
              <p className="font-label-sm text-xs text-on-surface-variant">Pro Plan</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1">
          <button className="flex items-center gap-3 w-full text-left bg-surface-variant text-on-surface rounded-md px-3 py-2 transition-all hover:bg-surface-container-highest group">
            <PlusCircle className="w-4 h-4 text-primary" />
            <span className="font-label-sm text-sm">New Chat</span>
          </button>

          <div className="mt-4 mb-2 px-3">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider text-xs font-semibold">Hoy</span>
          </div>

          <button className="flex items-center justify-between w-full text-left bg-secondary-container text-on-secondary-container rounded-md px-3 py-2 transition-all">
            <div className="flex items-center gap-3 truncate">
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span className="font-label-sm text-sm truncate">Optimización de Base...</span>
            </div>
          </button>

          <button className="flex items-center gap-3 w-full text-left text-on-surface-variant rounded-md px-3 py-2 transition-all hover:bg-surface-container-highest group">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="font-label-sm text-sm truncate">Análisis de Mercado Q3</span>
          </button>

          <div className="mt-4 mb-2 px-3">
             <span className="font-label-sm text-on-surface-variant uppercase tracking-wider text-xs font-semibold">Ayer</span>
          </div>

          <button className="flex items-center gap-3 w-full text-left text-on-surface-variant rounded-md px-3 py-2 transition-all hover:bg-surface-container-highest group">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="font-label-sm text-sm truncate">Componentes React - UI</span>
          </button>
        </nav>

        <div className="mt-auto border-t border-outline-variant pt-2">
          <button className="flex items-center gap-3 w-full text-left text-on-surface-variant rounded-md px-3 py-2 transition-all hover:bg-surface-container-highest">
            <HelpCircle className="w-4 h-4" />
            <span className="font-label-sm text-sm">Help</span>
          </button>
          <button className="flex items-center gap-3 w-full text-left text-on-surface-variant rounded-md px-3 py-2 transition-all hover:bg-surface-container-highest">
            <Settings className="w-4 h-4" />
            <span className="font-label-sm text-sm">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-surface relative min-w-0">
        <header className="flex justify-between items-center h-14 px-6 w-full sticky top-0 z-10 bg-surface border-b border-outline-variant">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold tracking-tight text-on-surface">Aura AI</h1>
            <div className="flex items-center gap-2 px-2 py-1 bg-surface-container-high rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="font-label-sm text-on-surface-variant text-xs">GPT-4 Turbo</span>
            </div>
          </div>
          
          <div className="hidden lg:flex gap-6">
            <button className="text-on-surface font-semibold border-b-2 border-on-surface pb-1">Models</button>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">Settings</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/voice')} className="text-on-surface-variant hover:text-primary transition-colors pr-2" title="Modo de Voz">
               <PhoneCall className="w-5 h-5" />
            </button>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <Radio className="w-5 h-5" />
            </button>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-8 flex flex-col items-center">
          <div className="w-full max-w-[48rem] flex flex-col gap-8">
            
            {/* Context Notice */}
            <div className="flex justify-center">
              <span className="bg-surface-variant text-on-surface-variant font-label-sm px-3 py-1 rounded-full text-xs font-medium">
                Contexto: Base de Datos PostgreSQL
              </span>
            </div>

            {/* User Message */}
            <div className="flex gap-4 justify-end">
              <div className="bg-surface-container-highest text-on-surface rounded-2xl rounded-tr-sm px-5 py-4 max-w-[85%] text-[15px] leading-relaxed">
                <p>Necesito optimizar una consulta SQL que está tardando mucho. Aquí está la estructura de las tablas involucradas y un pantallazo del plan de ejecución actual.</p>
                <div className="mt-3 rounded-lg overflow-hidden border border-outline-variant bg-surface-container-low max-w-sm">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd0sVlB_7TAZ5MGnrbw9THLlmgUyR6X0kf8-exinoDsKa34JDuib3txp_sr11gxOPNBEeLqCiC-1t4CfHdo7gw7D5blXsfGQ6l17-OAmbRN3xuo39oU35-7rg953hStXsuNjQlzVj5KE_Oqh4-FuaRkfKPhwwU_fclpf-ELCDfYDowFgf_w68s59XyDoj9dvHgMW_AbetIcQWILANfrxislQVN3RmwTOFY5ir2y-iGlGefxejwJ0QHioeqB5mLA5UohAKj-9rqWk5r" 
                    alt="Query execution plan diagram" 
                    className="w-full h-auto object-cover" 
                  />
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                U
              </div>
            </div>

            {/* AI Message */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-on-surface px-1 py-1 max-w-[85%] text-[15px] leading-relaxed">
                <p className="mb-4">Analizando el plan de ejecución y la estructura de tus tablas, el cuello de botella principal es un <strong>Sequential Scan</strong> en la tabla `usuarios_log` debido a la falta de un índice adecuado para tu cláusula `WHERE`.</p>
                <p className="mb-4">Te sugiero crear un índice compuesto y reestructurar ligeramente el `JOIN`. Aquí tienes el código optimizado:</p>
                
                <div className="bg-inverse-surface rounded-lg border border-outline-variant overflow-hidden mb-4">
                  <div className="flex justify-between items-center px-4 py-2 bg-on-secondary-fixed text-surface-container-high border-b border-outline-variant text-xs font-mono font-medium">
                    <span>sql</span>
                    <button className="flex items-center gap-1 hover:text-primary-fixed-dim transition-colors">
                      <Copy className="w-3 h-3" /> Copiar
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm font-mono text-surface-container-low"><code>{`CREATE INDEX idx_usuarios_log_fecha_estado 
ON usuarios_log (fecha_creacion DESC, estado_id);

SELECT 
    u.nombre, 
    u.email, 
    COUNT(ul.id) as eventos_recientes
FROM 
    usuarios u
INNER JOIN 
    usuarios_log ul ON u.id = ul.usuario_id
WHERE 
    ul.fecha_creacion >= NOW() - INTERVAL '30 days'
    AND ul.estado_id = 5
GROUP BY 
    u.id, u.nombre, u.email
HAVING 
    COUNT(ul.id) > 10;`}</code></pre>
                </div>
                
                <p className="mb-2">Después de aplicar este índice, corre un `EXPLAIN ANALYZE` nuevamente. Deberías ver un <strong>Index Scan</strong> o <strong>Bitmap Heap Scan</strong>, lo cual reducirá el tiempo de ejecución significativamente.</p>
                
                <div className="flex gap-1 mt-4">
                  <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                  <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"><ThumbsDown className="w-4 h-4" /></button>
                  <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"><RotateCcw className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Command Center Input */}
        <div className="p-4 bg-surface w-full flex justify-center pb-6 border-t border-transparent">
          <div className="w-full max-w-[48rem] bg-surface-container-high rounded-[0.625rem] border border-outline-variant shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all flex flex-col p-2">
            <textarea 
              className="w-full bg-transparent border-none resize-none focus:ring-0 text-on-surface text-[15px] p-2 max-h-32 placeholder:text-on-surface-variant/60 focus:outline-none" 
              placeholder="Escribe un mensaje o adjunta archivos..." 
              rows={1}
            />
            <div className="flex justify-between items-center mt-2 px-2">
              <div className="flex gap-1">
                <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/20 rounded-md transition-colors"><Paperclip className="w-4 h-4" /></button>
                <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/20 rounded-md transition-colors"><Mic className="w-4 h-4" /></button>
                <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/20 rounded-md transition-colors"><ImageIcon className="w-4 h-4" /></button>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-on-surface-variant font-medium hidden sm:inline-block mr-2">↵ para enviar</span>
                <button className="bg-primary text-on-primary p-2 rounded-md hover:bg-primary-fixed-variant transition-colors shadow-sm">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar (Advanced Tools) */}
      <aside className="hidden xl:flex flex-col w-[300px] border-l border-outline-variant bg-surface h-full flex-shrink-0">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h3 className="font-semibold text-[15px] text-on-surface">Herramientas Avanzadas</h3>
          <button className="text-on-surface-variant hover:text-on-surface"><X className="w-4 h-4" /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-on-surface">
              <TerminalSquare className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm">System Prompt Editor</h4>
            </div>
            <textarea 
              className="w-full bg-surface-container-highest border border-outline-variant rounded-md text-xs p-3 font-mono text-on-surface h-32 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
              defaultValue="Eres un experto en bases de datos relacionales, especializado en PostgreSQL. Tus respuestas deben ser directas, técnicas y siempre incluir código optimizado cuando se te presenten consultas lentas."
            />
            <div className="flex justify-end mt-1">
              <button className="text-xs bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded hover:bg-secondary-fixed transition-colors font-medium">Aplicar</button>
            </div>
          </div>

          <hr className="border-outline-variant" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-on-surface">
              <SearchCode className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm">Búsqueda Semántica</h4>
            </div>
            <p className="text-xs text-on-surface-variant">Busca conceptos similares en tu base de conocimiento conectada.</p>
            <div className="relative mt-1">
              <Search className="w-4 h-4 absolute left-3 top-2 text-on-surface-variant" />
              <input 
                className="w-full bg-surface border border-outline-variant rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface" 
                placeholder="Ej. Índices GIN..." 
              />
            </div>
            
            <div className="mt-2 flex flex-col gap-2">
              <div className="p-2 bg-surface-container-low rounded border border-outline-variant hover:border-primary/50 cursor-pointer transition-colors">
                <h5 className="text-xs font-semibold text-primary-fixed-variant">Doc: Tipos de Índices en Postgres</h5>
                <p className="text-[10px] text-on-surface-variant line-clamp-2 mt-1 leading-tight">Los índices B-Tree son los más comunes, pero para búsquedas de texto completo, GIN es preferible...</p>
              </div>
              <div className="p-2 bg-surface-container-low rounded border border-outline-variant hover:border-primary/50 cursor-pointer transition-colors">
                <h5 className="text-xs font-semibold text-primary-fixed-variant">Snippet: Configuración pg_hba.conf</h5>
                <p className="text-[10px] text-on-surface-variant line-clamp-2 mt-1 leading-tight">Asegúrate de configurar correctamente los métodos de autenticación md5 o scram-sha-256...</p>
              </div>
            </div>
          </div>

          <hr className="border-outline-variant" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-on-surface">
              <Database className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm">Contexto Activo</h4>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="flex items-center gap-1 text-[11px] font-medium bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full border border-secondary/20">
                <FileText className="w-3 h-3" /> schema_v2.sql
                <X className="w-3 h-3 hover:text-error cursor-pointer ml-1" />
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full border border-secondary/20">
                <Table className="w-3 h-3" /> db_logs.csv
                <X className="w-3 h-3 hover:text-error cursor-pointer ml-1" />
              </span>
            </div>
            <button className="mt-3 w-full border border-dashed border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary hover:bg-primary-container/10 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Añadir documento
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
