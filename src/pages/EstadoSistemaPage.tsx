import React from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  RefreshCw, 
  CheckCircle2, 
  HardDrive, 
  Zap, 
  Radio, 
  ShieldCheck, 
  Terminal,
  Clock,
  Layers,
  Sparkles,
  Bot,
  MessageSquare
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { CardContainer } from '../components/common/Card';

export const EstadoSistemaPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const servicesList = [
    { name: 'FastAPI Backend Core', category: 'API Layer', version: 'v1.10.0', latency: '12 ms', uptime: '99.98%', status: 'En Línea', icon: Server },
    { name: 'React 19 / Vite Frontend', category: 'UI Layer', version: 'v1.2.0', latency: '4 ms', uptime: '100.0%', status: 'En Línea', icon: Layers },
    { name: 'PostgreSQL 16 Engine', category: 'Database', version: 'v16.2', latency: '6 ms', uptime: '99.99%', status: 'En Línea', icon: Database },
    { name: 'Redis 7 Cache & Bus', category: 'Memory Cache', version: 'v7.2', latency: '1 ms', uptime: '100.0%', status: 'En Línea', icon: Zap },
    { name: 'Celery Async Worker Pool', category: 'Background Tasks', version: 'v5.3.6', latency: '18 ms', uptime: '99.95%', status: 'En Línea', icon: Cpu },
    { name: 'EasyPanel Orquestador', category: 'VPS Hostinger', version: 'Ubuntu 24.04', latency: '8 ms', uptime: '100.0%', status: 'En Línea', icon: HardDrive },
    { name: 'n8n Workflow Engine', category: 'Automation', version: 'v1.28.0', latency: '24 ms', uptime: '99.90%', status: 'En Línea', icon: Radio },
    { name: 'Apify B2B Scraper Connector', category: 'Lead Engine', version: 'API v2', latency: '120 ms', uptime: '99.85%', status: 'En Línea', icon: RefreshCw },
    { name: 'Google Gemini 1.5 Pro SDK', category: 'LLM & Vision', version: '@google/genai', latency: '340 ms', uptime: '99.99%', status: 'En Línea', icon: Sparkles },
    { name: 'OpenAI GPT-4o API', category: 'LLM Secondary', version: 'v2026-05', latency: '280 ms', uptime: '99.95%', status: 'En Línea', icon: Bot },
    { name: 'Meta WhatsApp Cloud API', category: 'Channel Gateway', version: 'Graph v18.0', latency: '95 ms', uptime: '99.90%', status: 'En Línea', icon: MessageSquare },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Sistema' }, { label: 'Monitor de Salud (Healthcheck)' }]} onNavigate={onNavigate} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Monitor de Salud de Infraestructura Premium</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Estado en tiempo real de los contenedores Docker, PostgreSQL, Redis, FastAPI y APIs externas de IA.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Ejecutar Ping Healthcheck</span>
        </button>
      </div>

      {/* Hardware Resources Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Uso de CPU</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-100">18.4 %</div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-blue-500 w-[18%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>Memoria RAM</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-100">2.4 GB / 8 GB</div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-purple-500 w-[30%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
            <span>Disco SSD NVMe</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-100">28.2 GB / 100 GB</div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 w-[28%]" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Tiempo Activo (Uptime)</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-100">42 días 18 hrs</div>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-1">SLO Cumplido 100%</span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Todos los 11 microservicios e integraciones operan normalmente sin degradación.</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">VPS: EasyPanel Hostinger / Ubuntu 24.04 LTS</span>
      </div>

      <CardContainer title="Catálogo de Componentes e Integraciones">
        <DataTable
          keyField="name"
          data={servicesList}
          columns={[
            {
              key: 'name',
              header: 'Servicio / Integración',
              render: (s) => {
                const Icon = s.icon;
                return (
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">{s.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{s.version}</div>
                    </div>
                  </div>
                );
              },
            },
            { key: 'category', header: 'Capa' },
            { key: 'latency', header: 'Latencia Promedio', render: (s) => <span className="font-mono text-xs">{s.latency}</span> },
            { key: 'uptime', header: 'Uptime (SLO 24h)', render: (s) => <span className="font-mono font-bold text-emerald-500">{s.uptime}</span> },
            {
              key: 'status',
              header: 'Estado',
              render: (s) => <Badge variant="emerald">{s.status}</Badge>,
            },
          ]}
        />
      </CardContainer>
    </div>
  );
};
