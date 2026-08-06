import React, { useState } from 'react';
import { Building2, Globe, MapPin, Users, Award, ExternalLink, Plus } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { MetricCard, CardContainer } from '../components/common/Card';
import { MOCK_ENTERPRISES } from '../services/mockData';
import { useFilterStore } from '../store/useFilterStore';
import { EmpresaExpedienteModal } from '../components/empresas/EmpresaExpedienteModal';
import { Empresa } from '../types';

export const EmpresasPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { searchTerm, statusFilter, industryFilter } = useFilterStore();
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);

  const filteredData = MOCK_ENTERPRISES.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nit.includes(searchTerm) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'TODOS' || item.status === statusFilter;
    const matchesIndustry = industryFilter === 'TODAS' || item.industry === industryFilter;

    return matchesSearch && matchesStatus && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Directorio B2B' }, { label: 'Empresas & Expedientes' }]} onNavigate={onNavigate} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Directorio B2B & Expedientes Empresariales</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Haga clic en cualquier empresa para desplegar su Dossier Empresarial unificado (Auditorías, CRM, Contactos y Documentos).
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          <span>Importar Empresas (Apify Scraper)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Empresas" value="1,240" change="+14 hoy" isPositive={true} icon={Building2} />
        <MetricCard title="Empresas Auditadas" value="380" change="+8.2%" isPositive={true} icon={Award} />
        <MetricCard title="Scoring Promedio" value="78.4 / 100" change="+3.1" isPositive={true} icon={Globe} />
      </div>

      <FilterBar
        statusOptions={['TODOS', 'Sin Analizar', 'Auditado', 'En Prospección', 'Cliente']}
        industryOptions={['TODAS', 'Manufactura', 'Finanzas', 'Salud', 'Tecnología', 'Educación']}
        onExport={() => alert('Exportando archivo CSV de empresas B2B...')}
        newActionLabel="Nueva Empresa Manual"
        onNewAction={() => alert('Modal creación preparado para FastAPI / PostgreSQL')}
      />

      <CardContainer title="Catálogo de Empresas Registradas">
        <DataTable
          keyField="id"
          data={filteredData}
          onRowClick={(emp) => setSelectedEmpresa(emp)}
          emptyTitle="No hay empresas registradas"
          emptyDescription="Intente modificar los términos de búsqueda o ejecute una tarea de prospección con Apify."
          columns={[
            { key: 'nit', header: 'NIT / ID', render: (e) => <span className="font-mono text-xs">{e.nit}</span> },
            {
              key: 'name',
              header: 'Nombre Empresa',
              render: (e) => (
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-500 transition cursor-pointer">
                    {e.name}
                  </div>
                  <a
                    href={e.website}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(evt) => evt.stopPropagation()}
                    className="text-[10px] text-blue-500 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{e.website}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              ),
            },
            { key: 'industry', header: 'Sector' },
            { key: 'employees', header: 'Empleados' },
            {
              key: 'location',
              header: 'Ubicación',
              render: (e) => (
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span>{e.location}</span>
                </div>
              ),
            },
            {
              key: 'score',
              header: 'Score IA',
              render: (e) => (
                <span className="font-mono font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {e.score} pts
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Estado',
              render: (e) => (
                <Badge
                  variant={
                    e.status === 'Cliente'
                      ? 'emerald'
                      : e.status === 'Auditado'
                      ? 'blue'
                      : e.status === 'En Prospección'
                      ? 'purple'
                      : 'slate'
                  }
                >
                  {e.status}
                </Badge>
              ),
            },
          ]}
        />
      </CardContainer>

      {/* Corporate Dossier Modal */}
      {selectedEmpresa && (
        <EmpresaExpedienteModal
          empresa={selectedEmpresa}
          onClose={() => setSelectedEmpresa(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
