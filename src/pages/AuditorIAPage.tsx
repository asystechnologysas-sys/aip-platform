import React from 'react';
import { BrainCircuit, Cpu, Sparkles, CheckCircle2, Play, FileCode2 } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { CardContainer } from '../components/common/Card';
import { MOCK_AI_AUDITS } from '../services/mockData';

export const AuditorIAPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Suite IA' }, { label: 'Auditor IA' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Auditor de Madurez IA B2B</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Motor de diagnóstico automatizado preparado para conectarse a Gemini 1.5 Pro, Claude 3.5 Sonnet y OpenAI GPT-4o.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Integración IA Pendiente</span>
          </span>
        </div>
      </div>

      {/* Model Selector Hub Stub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">Google Gemini 1.5 Pro</span>
            <Badge variant="blue">Principal</Badge>
          </div>
          <p className="text-[11px] text-slate-400">Optimizado para análisis profundo de balances, memorias y documentos B2B.</p>
          <div className="text-[10px] text-slate-500 font-mono">Status: Ready for GEMINI_API_KEY</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">Anthropic Claude 3.5 Sonnet</span>
            <Badge variant="purple">Análisis Técnico</Badge>
          </div>
          <p className="text-[11px] text-slate-400">Evaluación de infraestructura TI y arquitecturas de datos.</p>
          <div className="text-[10px] text-slate-500 font-mono">Status: Prepared in Service Layer</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">OpenAI GPT-4o</span>
            <Badge variant="emerald">Resumen Ejecutivo</Badge>
          </div>
          <p className="text-[11px] text-slate-400">Generación de síntesis ejecutivas para tomadores de decisiones.</p>
          <div className="text-[10px] text-slate-500 font-mono">Status: Prepared in Service Layer</div>
        </div>
      </div>

      <FilterBar statusOptions={['TODOS', 'Completado', 'En Proceso', 'Pendiente']} />

      <CardContainer title="Historial de Auditorías Procesadas">
        <DataTable
          keyField="id"
          data={MOCK_AI_AUDITS}
          columns={[
            {
              key: 'enterpriseName',
              header: 'Empresa',
              render: (a) => <span className="font-bold text-slate-900 dark:text-slate-100">{a.enterpriseName}</span>,
            },
            { key: 'industry', header: 'Sector' },
            {
              key: 'readinessScore',
              header: 'Puntaje Madurez',
              render: (a) => (
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${a.readinessScore}%` }} />
                  </div>
                  <span className="font-mono font-bold">{a.readinessScore}/100</span>
                </div>
              ),
            },
            {
              key: 'digitalMaturity',
              header: 'Categoría',
              render: (a) => (
                <Badge variant={a.digitalMaturity === 'Alta' ? 'emerald' : a.digitalMaturity === 'Media' ? 'amber' : 'rose'}>
                  {a.digitalMaturity}
                </Badge>
              ),
            },
            { key: 'opportunitiesFound', header: 'Oportunidades IA', render: (a) => `${a.opportunitiesFound} detectadas` },
            {
              key: 'status',
              header: 'Estado Auditoría',
              render: (a) => <Badge variant={a.status === 'Completado' ? 'blue' : 'amber'}>{a.status}</Badge>,
            },
            { key: 'date', header: 'Fecha Realización' },
          ]}
        />
      </CardContainer>
    </div>
  );
};
