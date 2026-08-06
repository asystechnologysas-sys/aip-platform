import React from 'react';
import { Megaphone, Play, Pause, TrendingUp, Send, Users } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { MetricCard, CardContainer } from '../components/common/Card';
import { MOCK_CAMPAIGNS } from '../services/mockData';

export const CampanasPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Marketing' }, { label: 'Campañas Comerciales' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Gestión de Campañas Outbound</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Orquestación de secuencias de prospección omnicanal (Email, LinkedIn, WhatsApp).
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition">
          + Crear Nueva Campaña
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Campañas Activas" value="3 Campañas" change="+1" isPositive={true} icon={Megaphone} />
        <MetricCard title="Leads Impactados" value="950 Leads" change="+24%" isPositive={true} icon={Users} />
        <MetricCard title="Apertura Promedio" value="70.5%" change="+5.2%" isPositive={true} icon={TrendingUp} />
      </div>

      <FilterBar statusOptions={['TODOS', 'Activa', 'Pausada', 'Borrador', 'Finalizada']} />

      <CardContainer title="Matriz de Campañas Comerciales">
        <DataTable
          keyField="id"
          data={MOCK_CAMPAIGNS}
          columns={[
            {
              key: 'name',
              header: 'Nombre Campaña',
              render: (c) => <span className="font-bold text-slate-900 dark:text-slate-100">{c.name}</span>,
            },
            { key: 'channel', header: 'Canal', render: (c) => <Badge variant="purple">{c.channel}</Badge> },
            { key: 'leadsCount', header: 'Audiencia' },
            { key: 'openRate', header: 'Tasa Apertura', render: (c) => <span className="font-mono font-bold text-emerald-500">{c.openRate}</span> },
            { key: 'conversionRate', header: 'Conversión', render: (c) => <span className="font-mono font-bold text-blue-500">{c.conversionRate}</span> },
            {
              key: 'status',
              header: 'Estado',
              render: (c) => <Badge variant={c.status === 'Activa' ? 'emerald' : 'amber'}>{c.status}</Badge>,
            },
            { key: 'startDate', header: 'Fecha Inicio' },
          ]}
        />
      </CardContainer>
    </div>
  );
};
