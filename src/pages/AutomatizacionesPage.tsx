import React, { useState } from 'react';
import { 
  GitMerge, 
  Play, 
  Pause, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Terminal, 
  Zap, 
  Sparkles, 
  Bot, 
  MessageSquare, 
  FileCheck2, 
  Plus,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CardContainer } from '../components/common/Card';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';

export interface WorkflowItem {
  id: string;
  name: string;
  trigger: string;
  engine: 'n8n' | 'Celery' | 'FastAPI Async' | 'Redis EventBus';
  status: 'ACTIVO' | 'PAUSADO' | 'EN_ERROR';
  lastRun: string;
  executionTime: string;
  successRate: string;
  retries: number;
  totalExecutions: number;
  lastError?: string;
}

export const AutomatizacionesPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
    {
      id: 'wf_01',
      name: 'Flujo Principal: Descubrimiento B2B -> Apify -> Auditoría IA',
      trigger: 'Evento EMPRESA_CREADA',
      engine: 'n8n',
      status: 'ACTIVO',
      lastRun: 'Hace 4 min',
      executionTime: '2.4s',
      successRate: '99.2%',
      retries: 0,
      totalExecutions: 1420,
    },
    {
      id: 'wf_02',
      name: 'Generación Automática de Diagnósticos PDF Ejecutivos',
      trigger: 'Evento AUDITORIA_COMPLETADA',
      engine: 'Celery',
      status: 'ACTIVO',
      lastRun: 'Hace 12 min',
      executionTime: '4.8s',
      successRate: '98.5%',
      retries: 1,
      totalExecutions: 380,
    },
    {
      id: 'wf_03',
      name: 'Disparo de Plantillas WhatsApp Cloud API HSM',
      trigger: 'Evento DIAGNOSTICO_GENERADO',
      engine: 'FastAPI Async',
      status: 'ACTIVO',
      lastRun: 'Hace 25 min',
      executionTime: '820ms',
      successRate: '97.8%',
      retries: 2,
      totalExecutions: 890,
    },
    {
      id: 'wf_04',
      name: 'Sincronización Bidireccional de Oportunidades CRM',
      trigger: 'Evento CLIENTE_RESPONDIO',
      engine: 'Redis EventBus',
      status: 'ACTIVO',
      lastRun: 'Hace 1 hora',
      executionTime: '150ms',
      successRate: '100.0%',
      retries: 0,
      totalExecutions: 2400,
    },
    {
      id: 'wf_05',
      name: 'Reintento Automático en Dead Letter Queue (DLQ)',
      trigger: 'Error de Red / API Timeout',
      engine: 'Celery',
      status: 'PAUSADO',
      lastRun: 'Hace 3 horas',
      executionTime: '1.2s',
      successRate: '92.0%',
      retries: 5,
      totalExecutions: 45,
      lastError: 'HTTP 429 Too Many Requests de API externa',
    },
  ]);

  const [selectedWf, setSelectedWf] = useState<WorkflowItem | null>(null);

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id === id) {
          const newStatus = wf.status === 'ACTIVO' ? 'PAUSADO' : 'ACTIVO';
          return { ...wf, status: newStatus };
        }
        return wf;
      })
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Automatizaciones' }, { label: 'Flujos & Orquestación' }]} onNavigate={onNavigate} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Orquestación de Flujos & Automatizaciones</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Supervise el estado de ejecución, tiempos de respuesta, reintentos y logs de los flujos automáticos event-driven.
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          <span>Diseñar Nuevo Flujo (n8n Engine)</span>
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <GitMerge className="w-3.5 h-3.5 text-blue-400" />
            <span>Flujos Activos</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-100">4 / 5 Flujos</div>
          <div className="text-[10px] text-emerald-400 font-semibold">99.4% Uptime Global</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Ejecuciones Hoy</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-100">5,130 ejecuciones</div>
          <div className="text-[10px] text-slate-400 font-mono">Promedio 1.8s / flujo</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5 text-purple-400" />
            <span>Tasa de Reintentos</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-100">0.4% (8 reintentos)</div>
          <div className="text-[10px] text-emerald-400 font-semibold">Manejo Exponencial Backoff</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tasa de Éxito</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400">99.6 %</div>
          <div className="text-[10px] text-slate-400 font-mono">Cero perdidas en Redis DLQ</div>
        </div>
      </div>

      <CardContainer title="Catálogo de Workflows Event-Driven">
        <DataTable
          keyField="id"
          data={workflows}
          onRowClick={(wf) => setSelectedWf(wf)}
          columns={[
            {
              key: 'name',
              header: 'Nombre del Flujo',
              render: (w) => (
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-400 transition cursor-pointer">
                    {w.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Disparador: {w.trigger}</div>
                </div>
              ),
            },
            {
              key: 'engine',
              header: 'Motor',
              render: (w) => (
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  {w.engine}
                </span>
              ),
            },
            { key: 'executionTime', header: 'Tiempo Prom.', render: (w) => <span className="font-mono text-xs">{w.executionTime}</span> },
            { key: 'successRate', header: 'Éxito', render: (w) => <span className="font-mono font-bold text-emerald-400">{w.successRate}</span> },
            { key: 'lastRun', header: 'Última Ejecución', render: (w) => <span className="text-xs text-slate-400">{w.lastRun}</span> },
            {
              key: 'status',
              header: 'Estado',
              render: (w) => (
                <div className="flex items-center gap-2">
                  <Badge variant={w.status === 'ACTIVO' ? 'emerald' : 'slate'}>{w.status}</Badge>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWorkflowStatus(w.id);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title={w.status === 'ACTIVO' ? 'Pausar Flujo' : 'Reanudar Flujo'}
                  >
                    {w.status === 'ACTIVO' ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              ),
            },
          ]}
        />
      </CardContainer>

      {/* Detail Inspector Drawer / Box */}
      {selectedWf && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-sm text-slate-100">{selectedWf.name}</h3>
            </div>
            <button
              onClick={() => setSelectedWf(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar Inspección
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-500 block font-medium">Disparador (Trigger)</span>
              <span className="font-mono font-bold text-blue-400 mt-1 block">{selectedWf.trigger}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-500 block font-medium">Total Ejecuciones Históricas</span>
              <span className="font-mono font-bold text-slate-100 mt-1 block">{selectedWf.totalExecutions.toLocaleString()} corridas</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <span className="text-slate-500 block font-medium">Reintentos Fallidos</span>
              <span className="font-mono font-bold text-amber-400 mt-1 block">{selectedWf.retries} intentos en cola</span>
            </div>
          </div>

          {selectedWf.lastError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
              <strong>Último Log de Error:</strong> {selectedWf.lastError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
