import React from 'react';
import { Briefcase, DollarSign, UserCheck, TrendingUp, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { MetricCard, CardContainer } from '../components/common/Card';
import { MOCK_CRM_DEALS } from '../services/mockData';

export const CRMPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Operaciones Core' }, { label: 'CRM Comercial' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Pipeline CRM B2B</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Control integral de negocios, etapas de venta y cierre de cuentas clave.
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition">
          + Nuevo Negocio CRM
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Cierre Proyectado Q1" value="$98.5M COP" change="+16%" isPositive={true} icon={DollarSign} />
        <MetricCard title="Tasa de Cierre" value="34.8%" change="+2.4%" isPositive={true} icon={TrendingUp} />
        <MetricCard title="Ticket Promedio" value="$32.8M COP" change="+8%" isPositive={true} icon={Briefcase} />
      </div>

      <FilterBar statusOptions={['TODOS', 'Cualificación', 'Propuesta', 'Negociación', 'Cierre']} />

      <CardContainer title="Oportunidades Comerciales Activas">
        <DataTable
          keyField="id"
          data={MOCK_CRM_DEALS}
          columns={[
            {
              key: 'title',
              header: 'Oportunidad',
              render: (d) => <span className="font-bold text-slate-900 dark:text-slate-100">{d.title}</span>,
            },
            { key: 'company', header: 'Empresa Cliente' },
            { key: 'amount', header: 'Monto Estimado', render: (d) => <span className="font-mono font-bold text-emerald-500">{d.amount}</span> },
            { key: 'probability', header: 'Probabilidad', render: (d) => <span className="font-mono">{d.probability}</span> },
            {
              key: 'stage',
              header: 'Etapa',
              render: (d) => <Badge variant={d.stage === 'Cierre' ? 'emerald' : d.stage === 'Negociación' ? 'blue' : 'amber'}>{d.stage}</Badge>,
            },
            { key: 'owner', header: 'Ejecutivo Account Manager' },
          ]}
        />
      </CardContainer>
    </div>
  );
};
