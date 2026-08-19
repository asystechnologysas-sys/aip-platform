import React, { useState, useEffect } from 'react';
import { Building2, Globe, MapPin, Users, Award, ExternalLink, Plus, Loader2 } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { MetricCard, CardContainer } from '../components/common/Card';
import { useFilterStore } from '../store/useFilterStore';
import { EmpresaExpedienteModal } from '../components/empresas/EmpresaExpedienteModal';
import { Enterprise } from '../types'; 

export const EmpresasPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { searchTerm, statusFilter, industryFilter } = useFilterStore();
  const [selectedEmpresa, setSelectedEmpresa] = useState<Enterprise | null>(null); // 2. Cambiado a Enterprise
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]); // 3. Cambiado a Enterprise
  const [loading, setLoading] = useState(true);

  // Cargar datos desde la base de datos
  const loadRealData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://aipplatformweb-backend.xn53ak.easypanel.host/api/v1/prospeccion/prospectos');
      const dataFromDB = await response.json();

      const formattedData: Enterprise[] = dataFromDB.map((item: any) => ({
        id: item.id.toString(),
        nit: item.telefono || 'S/N',
        name: item.nombre || 'Sin nombre',
        industry: item.categoria || 'General',
        employees: '1-10',
        location: item.direccion || 'Barranquilla',
        score: Math.round(item.rating * 20) || 0,
        status: 'Auditado',
        website: item.sitio_web || '#',
        createdAt: item.created_at
      }));

      setEnterprises(formattedData);
    } catch (error) {
      console.error("Error cargando empresas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRealData();
  }, []);

  // Función para disparar la búsqueda desde el botón
  const handleImportar = async () => {
  const keyword = prompt("¿Qué empresas buscas? (ej: Restaurantes)");
  if (!keyword) return;

  const city = prompt("¿En qué ciudad?", "Barranquilla");
  if (!city) return;

  await fetch('https://aipplatformweb-backend.xn53ak.easypanel.host/api/v1/prospeccion/buscar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword: keyword, ciudad: city }) // Enviamos ambos
  });
  
  alert("🚀 Búsqueda iniciada...");
};

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
          <h1 className="text-xl font-bold tracking-tight">Directorio B2B & Expedientes Reales</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Datos cargados en tiempo real desde PostgreSQL.
          </p>
        </div>
        <button 
          onClick={handleImportar} // 4. Conectamos la función aquí
          className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Importar Empresas (Apify Scraper)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Empresas" value={enterprises.length.toString()} change="+1 real" isPositive={true} icon={Building2} />
        <MetricCard title="Empresas Auditadas" value="1" change="0%" isPositive={true} icon={Award} />
        <MetricCard title="Scoring Promedio" value="-- / 100" change="0" isPositive={true} icon={Globe} />
      </div>

      <FilterBar
        statusOptions={['TODOS', 'Sin Analizar', 'Auditado', 'En Prospección', 'Cliente']}
        industryOptions={['TODAS', 'General', 'Servicios', 'Tecnología']}
        onExport={() => alert('Exportando...')}
        newActionLabel="Nueva Empresa Manual"
        onNewAction={() => alert('Modal manual')}
      />

      <CardContainer title="Catálogo de Empresas Registradas">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-500">
             <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
             <p>Consultando base de datos...</p>
          </div>
        ) : (
          <DataTable
            keyField="id"
            data={filteredData}
            onRowClick={(emp) => setSelectedEmpresa(emp)}
            emptyTitle="No hay empresas"
            emptyDescription="Usa el botón de importar para traer datos de Apify."
            columns={[
              { key: 'nit', header: 'NIT / Tel', render: (e) => <span className="font-mono text-xs">{e.nit}</span> },
              {
                key: 'name',
                header: 'Nombre Empresa',
                render: (e) => (
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{e.name}</div>
                    <a href={e.website} target="_blank" rel="noreferrer" className="text-[10px] text-blue-500 hover:underline">{e.website}</a>
                  </div>
                ),
              },
              { key: 'industry', header: 'Sector' },
              { key: 'location', header: 'Ubicación' },
              {
                key: 'score',
                header: 'Score IA',
                render: (e) => (
                  <span className="font-mono font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
                    {e.score} pts
                  </span>
                ),
              },
              {
                key: 'status',
                header: 'Estado',
                render: (e) => <Badge variant="blue">{e.status}</Badge>,
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