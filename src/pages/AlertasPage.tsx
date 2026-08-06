import React from 'react';
import { BellRing, ShieldAlert, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { CardContainer } from '../components/common/Card';
import { MOCK_ALERTS } from '../services/mockData';

export const AlertasPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Sistema' }, { label: 'Centro de Alertas' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Alertas y Notificaciones de Operación</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor de eventos críticos, hallazgos en prospección y advertencias de infraestructura.
          </p>
        </div>
      </div>

      <FilterBar statusOptions={['TODOS', 'info', 'warning', 'error', 'success']} />

      <CardContainer title="Historial de Eventos Notificados">
        <DataTable
          keyField="id"
          data={MOCK_ALERTS}
          columns={[
            {
              key: 'title',
              header: 'Alerta / Evento',
              render: (a) => (
                <div className="flex items-center gap-2">
                  {a.type === 'error' ? (
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                  ) : a.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  )}
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{a.title}</div>
                    <div className="text-[10px] text-slate-400">{a.message}</div>
                  </div>
                </div>
              ),
            },
            { key: 'source', header: 'Servidor / Servicio' },
            {
              key: 'type',
              header: 'Severidad',
              render: (a) => (
                <Badge variant={a.type === 'error' ? 'rose' : a.type === 'warning' ? 'amber' : 'emerald'}>
                  {a.type.toUpperCase()}
                </Badge>
              ),
            },
            { key: 'timestamp', header: 'Timestamp' },
            {
              key: 'read',
              header: 'Estado',
              render: (a) => <Badge variant={a.read ? 'slate' : 'blue'}>{a.read ? 'Leído' : 'Nuevo'}</Badge>,
            },
          ]}
        />
      </CardContainer>
    </div>
  );
};
