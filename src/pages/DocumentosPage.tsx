import React from 'react';
import { FileText, Download, Share2, UploadCloud, Folder } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { CardContainer } from '../components/common/Card';
import { MOCK_DOCUMENTS } from '../services/mockData';

export const DocumentosPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Suite IA' }, { label: 'Documentos & Propuestas' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Gestor de Documentación B2B</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Almacenamiento y versionamiento de propuestas comerciales, contratos y plantillas empresariales.
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition flex items-center gap-1.5">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Subir Documento</span>
        </button>
      </div>

      <FilterBar statusOptions={['TODOS', 'Propuesta Comercial', 'Informe Diagnóstico', 'Plantilla']} />

      <CardContainer title="Biblioteca Unificada de Documentos">
        <DataTable
          keyField="id"
          data={MOCK_DOCUMENTS}
          columns={[
            {
              key: 'title',
              header: 'Nombre Archivo',
              render: (doc) => (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">{doc.title}</span>
                </div>
              ),
            },
            {
              key: 'type',
              header: 'Tipo Documento',
              render: (doc) => <Badge variant="blue">{doc.type}</Badge>,
            },
            { key: 'size', header: 'Tamaño' },
            {
              key: 'format',
              header: 'Formato',
              render: (doc) => (
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                  {doc.format}
                </span>
              ),
            },
            { key: 'author', header: 'Creado Por' },
            { key: 'createdAt', header: 'Fecha' },
            {
              key: 'actions',
              header: 'Descargar',
              render: () => (
                <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-500">
                  <Download className="w-4 h-4" />
                </button>
              ),
            },
          ]}
        />
      </CardContainer>
    </div>
  );
};
