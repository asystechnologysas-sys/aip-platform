import React, { useState, useEffect } from 'react'; // 1. Agregamos useEffect
import { Building2, Globe, MapPin, Users, Award, ExternalLink, Plus, Loader2 } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { MetricCard, CardContainer } from '../components/common/Card';
import { useFilterStore } from '../store/useFilterStore';
import { EmpresaExpedienteModal } from '../components/empresas/EmpresaExpedienteModal';
import { Empresa } from '../types';

export const EmpresasPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { searchTerm, statusFilter, industryFilter } = useFilterStore();
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  
  // --- NUEVO: Estado para guardar las empresas de la base de datos ---
  const [enterprises, setEnterprises] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

  // --- NUEVO: Función para traer los datos del Backend ---
  useEffect(() => {
    const loadRealData = async () => {
      try {
        // Llamamos a tu API en Easypanel
        const response = await fetch('https://aipplatformweb-backend.xn53ak.easypanel.host/api/v1/prospeccion/prospectos');
        const dataFromDB = await response.json();

        // Mapeamos los nombres (De base de datos a Frontend)
        const formattedData: Empresa[] = dataFromDB.map((item: any) => ({
          id: item.id.toString(),
          nit: item.telefono || 'S/N', // Usamos el tel como ID temporal o NIT
          name: item.nombre,
          industry: item.categoria || 'General',
          employees: '1-10', // Dato por defecto
          location: item.direccion || item.ciudad || 'Barranquilla',
          score: Math.round(item.rating * 20) || 0, // Convertimos rating 0-5 a 0-100
          status: item.estado === 'descubierto' ? 'Sin Analizar' : 'Auditado',
          website: item.sitio_web || '#',
          createdAt: item.created_at
        }));

        setEnterprises(formattedData);
      } catch (error) {
        console.error("Error cargando empresas reales:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRealData();
  }, []);

  // Ahora filtramos sobre 'enterprises' (los reales) en lugar de MOCK
  const filteredData = enterprises.filter((item) => {
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
            {loading ? 'Cargando datos reales de la base de datos...' : 'Datos sincronizados con PostgreSQL.'}
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          <span>Importar Empresas (Apify Scraper)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Usamos el largo de nuestra lista real para las métricas */}
        <MetricCard title="Total Empresas" value={enterprises.length.toString()} change="+1 real" isPositive={true} icon={Building2} />
        <MetricCard title="Empresas Auditadas" value="1" change="0%" isPositive={true} icon={Award} />
        <MetricCard title="Scoring Promedio" value="-- / 100" change="0" isPositive={true} icon={Globe} />
      </div>

      <FilterBar
        statusOptions={['TODOS', 'Sin Analizar', 'Auditado', 'En Prospección', 'Cliente']}
        industryOptions={['TODAS', 'Manufactura', 'Finanzas', 'Salud', 'Tecnología', 'Educación']}
        onExport={() => alert('Exportando resultados reales...')}
        newActionLabel="Nueva Empresa Manual"
        onNewAction={() => alert('Modal creación preparado')}
      />

      <CardContainer title="Catálogo de Empresas Registradas">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-500">
             <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
             <p>Consultando PostgreSQL...</p>
          </div>
        ) : (
          <DataTable
            keyField="id"
            data={filteredData}
            onRowClick={(emp) => setSelectedEmpresa(emp)}
            emptyTitle="No hay empresas registradas"
            emptyDescription="Ejecute una búsqueda en el módulo de Prospección."
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
              { key: 'location', header: 'Ubicación' },
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
                      e.status === 'Cliente' ? 'emerald' : e.status === 'Auditado' ? 'blue' : 'slate'
                    }
                  >
                    {e.status}
                  </Badge>
                ),
              },
            ]}
          />
        )}
      </CardContainer>

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