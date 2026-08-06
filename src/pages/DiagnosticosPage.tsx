import React from 'react';
import { FileCheck2, Download, Eye, AlertTriangle, FileText } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { CardContainer } from '../components/common/Card';
import { MOCK_DIAGNOSTICS } from '../services/mockData';

export const DiagnosticosPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Suite IA' }, { label: 'Diagnósticos Personalizados' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Diagnósticos Empresariales Generados</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Documentos ejecutivos de diagnóstico en PDF listos para envío a prospectos.
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition">
          + Generar Nuevo Diagnóstico
        </button>
      </div>

      <FilterBar statusOptions={['TODOS', 'Aprobado', 'Enviado', 'Borrador']} />

      <CardContainer title="Biblioteca de Diagnósticos Ejecutivos">
        <DataTable
          keyField="id"
          data={MOCK_DIAGNOSTICS}
          columns={[
            { key: 'code', header: 'Código', render: (d) => <span className="font-mono font-bold text-blue-500">{d.code}</span> },
            {
              key: 'enterpriseName',
              header: 'Empresa',
              render: (d) => <span className="font-bold text-slate-900 dark:text-slate-100">{d.enterpriseName}</span>,
            },
            { key: 'version', header: 'Versión' },
            {
              key: 'riskLevel',
              header: 'Nivel de Riesgo',
              render: (d) => (
                <Badge variant={d.riskLevel === 'Bajo' ? 'emerald' : d.riskLevel === 'Medio' ? 'amber' : 'rose'}>
                  {d.riskLevel}
                </Badge>
              ),
            },
            { key: 'recommendationsCount', header: 'Recomendaciones', render: (d) => `${d.recommendationsCount} iniciativas` },
            { key: 'createdAt', header: 'Fecha Generación' },
            {
              key: 'status',
              header: 'Estado Documento',
              render: (d) => (
                <Badge variant={d.status === 'Aprobado' ? 'emerald' : d.status === 'Enviado' ? 'purple' : 'slate'}>
                  {d.status}
                </Badge>
              ),
            },
            {
              key: 'actions',
              header: 'Acciones',
              render: () => (
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-500">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-500">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      </CardContainer>
    </div>
  );
};
