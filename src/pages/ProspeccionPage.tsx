import React from 'react';
import { Target, PhoneCall, Mail, Clock, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { MetricCard, CardContainer } from '../components/common/Card';
import { MOCK_PROSPECTS } from '../services/mockData';
import { useFilterStore } from '../store/useFilterStore';

export const ProspeccionPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { searchTerm, statusFilter } = useFilterStore();

  const filteredData = MOCK_PROSPECTS.filter((p) => {
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'TODOS' || p.stage === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Prospección Comercial' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Embudo de Prospección B2B</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Seguimiento de leads calificados por IA con historial de interacciones listo para n8n / WhatsApp.
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition">
          + Iniciar Outreach Automatizado
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <MetricCard title="Leads Activos" value="142" change="+18%" isPositive={true} icon={Target} />
        <MetricCard title="Citas Programadas" value="28" change="+5" isPositive={true} icon={PhoneCall} />
        <MetricCard title="Tasa de Respuesta" value="38.2%" change="+4.1%" isPositive={true} icon={Mail} />
        <MetricCard title="Valor Pipeline" value="$123.5M COP" change="+12%" isPositive={true} icon={Clock} />
      </div>

      <FilterBar
        statusOptions={['TODOS', 'Lead Contactado', 'Diagnóstico Enviado', 'En Negociación', 'Cerrado Ganado']}
        onExport={() => alert('Exportando embudo...')}
      />

      <CardContainer title="Matriz de Contactos B2B">
        <DataTable
          keyField="id"
          data={filteredData}
          columns={[
            {
              key: 'companyName',
              header: 'Empresa Lead',
              render: (p) => <span className="font-bold text-slate-900 dark:text-slate-100">{p.companyName}</span>,
            },
            {
              key: 'contactName',
              header: 'Persona de Contacto',
              render: (p) => (
                <div>
                  <div className="font-semibold">{p.contactName}</div>
                  <div className="text-[10px] text-slate-400">{p.email} • {p.phone}</div>
                </div>
              ),
            },
            {
              key: 'stage',
              header: 'Etapa del Embudo',
              render: (p) => (
                <Badge
                  variant={
                    p.stage === 'Cerrado Ganado'
                      ? 'emerald'
                      : p.stage === 'En Negociación'
                      ? 'blue'
                      : p.stage === 'Diagnóstico Enviado'
                      ? 'purple'
                      : 'slate'
                  }
                >
                  {p.stage}
                </Badge>
              ),
            },
            { key: 'value', header: 'Valor Oportunidad', render: (p) => <span className="font-mono">{p.value}</span> },
            {
              key: 'score',
              header: 'Fit Score',
              render: (p) => (
                <span className="font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {p.score}%
                </span>
              ),
            },
            { key: 'lastContact', header: 'Última Interacción' },
          ]}
        />
      </CardContainer>
    </div>
  );
};
