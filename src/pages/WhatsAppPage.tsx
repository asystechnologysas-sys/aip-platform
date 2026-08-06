import React from 'react';
import { MessageSquare, CheckCheck, RefreshCw, AlertCircle, Smartphone } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { CardContainer } from '../components/common/Card';
import { MOCK_WHATSAPP_TEMPLATES } from '../services/mockData';

export const WhatsAppPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Canales' }, { label: 'WhatsApp Business API' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Módulo WhatsApp Cloud API</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Arquitectura de canal empresarial preparada para la integración oficial de Meta Cloud API.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex items-center gap-1">
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Webhook Ready</span>
          </span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100">Línea Corporativa +57 300 ASYS AIP</h3>
            <p className="text-[11px] text-slate-400">WABA ID: 1098410294812 • Meta Business Manager Configured</p>
          </div>
        </div>
        <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Verificar Token</span>
        </button>
      </div>

      <FilterBar statusOptions={['TODOS', 'APROBADO', 'PENDIENTE', 'RECHAZADO']} />

      <CardContainer title="Plantillas de Mensajes HSM (Approved Templates)">
        <DataTable
          keyField="id"
          data={MOCK_WHATSAPP_TEMPLATES}
          columns={[
            {
              key: 'name',
              header: 'Nombre Plantilla',
              render: (w) => <span className="font-mono font-bold text-blue-400">{w.name}</span>,
            },
            { key: 'category', header: 'Categoría Meta' },
            { key: 'language', header: 'Idioma' },
            {
              key: 'status',
              header: 'Estado Aprobación',
              render: (w) => <Badge variant={w.status === 'APROBADO' ? 'emerald' : 'amber'}>{w.status}</Badge>,
            },
            { key: 'lastUsed', header: 'Último Envío' },
          ]}
        />
      </CardContainer>
    </div>
  );
};
