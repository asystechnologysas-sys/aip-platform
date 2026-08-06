import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  BrainCircuit, 
  FileCheck2, 
  Target, 
  TrendingUp, 
  Activity, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  Briefcase,
  Layers,
  Zap,
  Calendar,
  Plus,
  RefreshCw,
  Server,
  ChevronRight
} from 'lucide-react';
import { MetricCard, CardContainer } from '../components/common/Card';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { AsysLogo } from '../components/common/AsysLogo';
import { 
  MOCK_ENTERPRISES, 
  MOCK_DIAGNOSTICS, 
  MOCK_SYSTEM_SERVICES 
} from '../services/mockData';
import { domainEventBus, DomainEventPayload } from '../core/events/DomainEventBus';
import { taskQueueManager } from '../core/queue/TaskQueueManager';
import { EmpresaExpedienteModal } from '../components/empresas/EmpresaExpedienteModal';
import { Empresa } from '../types';

export const DashboardPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [events, setEvents] = useState<DomainEventPayload[]>([]);

  useEffect(() => {
    setEvents(domainEventBus.getHistory());
  }, []);

  const crmStages = [
    { name: 'Prospección B2B', count: 45, value: '$32.0M', color: 'bg-slate-500' },
    { name: 'Calificado IA', count: 28, value: '$45.5M', color: 'bg-blue-500' },
    { name: 'En Diagnóstico', count: 18, value: '$38.0M', color: 'bg-purple-500' },
    { name: 'Propuesta Enviada', count: 12, value: '$26.0M', color: 'bg-amber-500' },
    { name: 'Cierre Comercial', count: 6, value: '$18.5M', color: 'bg-emerald-500' },
  ];

  const pendingTasks = [
    { id: '1', title: 'Enviar Diagnóstico PDF a Alpina Productos Alimenticios', priority: 'Alta', due: 'Hoy 2:00 PM', path: '/diagnosticos' },
    { id: '2', title: 'Aprobar Plantilla WhatsApp HSM para Campaña Alimentos', priority: 'Media', due: 'Hoy 4:30 PM', path: '/whatsapp' },
    { id: '3', title: 'Revisar logs de ejecución del Scraper B2B Bogotá', priority: 'Baja', due: 'Mañana', path: '/logs' },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Inicio' }, { label: 'Dashboard Resumen' }]} onNavigate={onNavigate} />

      {/* Corporate Executive Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0b1329] via-[#080d1a] to-[#050811] border border-blue-500/30 text-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <AsysLogo size="sm" variant="full" />
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sistema Operativo 100%
              </span>
            </div>
            
            <h1 className="text-2xl font-black tracking-tight text-white mt-1">
              ¿Cómo va hoy el negocio?
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Resumen en tiempo real del pipeline comercial B2B, estado de las auditorías de Inteligencia Artificial, interacciones en WhatsApp y salud de la infraestructura.
            </p>
          </div>

          {/* Quick Action Launcher Bar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('/empresas')}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Empresa</span>
            </button>

            <button
              onClick={() => onNavigate('/auditor-ia')}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 transition flex items-center gap-1.5"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Auditar con IA</span>
            </button>

            <button
              onClick={() => onNavigate('/campanas')}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Lanzar Campaña</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Core Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Empresas Descubiertas"
          value="1,240 Empresas"
          change="+14 hoy"
          isPositive={true}
          description="Enriquecidas via Apify & Cámara de Comercio"
          icon={Building2}
        />
        <MetricCard
          title="Empresas Auditadas"
          value="380 Auditadas"
          change="84.2/100 Score"
          isPositive={true}
          description="Análisis de madurez digital con Gemini"
          icon={BrainCircuit}
        />
        <MetricCard
          title="Conversaciones Activas"
          value="24 Chats Activos"
          change="+6 nuevas"
          isPositive={true}
          description="Canal WhatsApp API & Agentes IA"
          icon={MessageSquare}
        />
        <MetricCard
          title="Pipeline Comercial (CRM)"
          value="$160.0M COP"
          change="+18.5%"
          isPositive={true}
          description="109 Oportunidades en embudo activo"
          icon={Briefcase}
        />
      </div>

      {/* Embudo Comercial (CRM Funnel Section) */}
      <CardContainer
        title="Embudo Comercial & Flujo de Oportunidades (CRM)"
        subtitle="Distribución de empresas a lo largo de las etapas de conversión"
        action={
          <button
            onClick={() => onNavigate('/crm')}
            className="text-xs text-blue-500 font-bold hover:underline flex items-center gap-1"
          >
            <span>Ver CRM Completo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {crmStages.map((stg, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-blue-500/40 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stg.name}</span>
                <span className={`w-2 h-2 rounded-full ${stg.color}`} />
              </div>
              <div className="text-xl font-black text-slate-100 font-mono">{stg.count}</div>
              <div className="text-xs text-emerald-400 font-semibold font-mono">{stg.value} COP</div>
            </div>
          ))}
        </div>
      </CardContainer>

      {/* Middle Section: Live Activity Feed & Pending Business Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Event Feed */}
        <div className="lg:col-span-2">
          <CardContainer
            title="Feed de Actividad en Tiempo Real (Domain Events)"
            subtitle="Eventos transmitidos a través del bus de eventos desacoplado"
            action={
              <button
                onClick={() => onNavigate('/logs')}
                className="text-xs text-blue-500 font-bold hover:underline flex items-center gap-1"
              >
                <span>Ver Todos los Logs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="space-y-3">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start justify-between text-xs transition hover:border-slate-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100">{evt.eventType}</span>
                        <Badge variant="blue">{evt.source}</Badge>
                      </div>
                      <p className="text-slate-400 mt-1 font-mono text-[11px]">
                        {JSON.stringify(evt.data)}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">{evt.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContainer>
        </div>

        {/* Agenda & Priority Tasks */}
        <CardContainer title="Agenda & Próximas Tareas Prioritarias">
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onNavigate(task.path)}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Badge variant={task.priority === 'Alta' ? 'rose' : task.priority === 'Media' ? 'amber' : 'slate'}>
                    Prioridad {task.priority}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-400" />
                    {task.due}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-200">{task.title}</div>
              </div>
            ))}
          </div>
        </CardContainer>
      </div>

      {/* Direct Catalogs Quick View */}
      <CardContainer
        title="Empresas con Mayor Potencial (Score > 80)"
        subtitle="Haga clic en cualquier fila para desplegar el Expediente Empresarial completo"
        action={
          <button
            onClick={() => onNavigate('/empresas')}
            className="text-xs text-blue-500 font-bold hover:underline flex items-center gap-1"
          >
            <span>Ver Catálogo Completo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <DataTable
          keyField="id"
          data={MOCK_ENTERPRISES.slice(0, 4)}
          onRowClick={(emp) => setSelectedEmpresa(emp)}
          columns={[
            { key: 'nit', header: 'NIT', render: (e) => <span className="font-mono text-xs">{e.nit}</span> },
            { key: 'name', header: 'Nombre Empresa', render: (e) => <span className="font-bold text-slate-100">{e.name}</span> },
            { key: 'industry', header: 'Sector' },
            { key: 'location', header: 'Ubicación' },
            {
              key: 'score',
              header: 'Score IA',
              render: (e) => (
                <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {e.score} pts
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Estado',
              render: (e) => <Badge variant={e.status === 'Cliente' ? 'emerald' : 'blue'}>{e.status}</Badge>,
            },
          ]}
        />
      </CardContainer>

      {/* Expediente Modal */}
      {selectedEmpresa && (
        <EmpresaExpedienteModal
          empresa={selectedEmpresa}
          onClose={() => setSelectedEmpresa(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
