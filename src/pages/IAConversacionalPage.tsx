import React from 'react';
import { Bot, Sparkles, MessageCircle, Cpu, Zap } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { CardContainer } from '../components/common/Card';
import { MOCK_AGENTS } from '../services/mockData';

export const IAConversacionalPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Suite IA' }, { label: 'IA Conversacional' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Agentes IA Conversacionales</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Orquestador de agentes autónomos preparados para cualificación de prospectos y soporte comercial.
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition">
          + Desplegar Agente LLM
        </button>
      </div>

      <FilterBar statusOptions={['TODOS', 'En Línea', 'Standby', 'Mantenimiento']} />

      <CardContainer title="Matriz de Agentes Conversacionales">
        <DataTable
          keyField="id"
          data={MOCK_AGENTS}
          columns={[
            {
              key: 'name',
              header: 'Nombre del Agente',
              render: (a) => (
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">{a.name}</span>
                </div>
              ),
            },
            {
              key: 'model',
              header: 'Modelo LLM Base',
              render: (a) => <Badge variant="purple">{a.model}</Badge>,
            },
            { key: 'activeSessions', header: 'Sesiones Activas', render: (a) => `${a.activeSessions} chats` },
            { key: 'avgResponseTime', header: 'Tiempo Respuesta', render: (a) => <span className="font-mono">{a.avgResponseTime}</span> },
            {
              key: 'status',
              header: 'Estado',
              render: (a) => <Badge variant={a.status === 'En Línea' ? 'emerald' : 'slate'}>{a.status}</Badge>,
            },
          ]}
        />
      </CardContainer>
    </div>
  );
};
