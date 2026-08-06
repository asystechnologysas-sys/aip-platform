import React from 'react';
import { Image as ImageIcon, Sparkles, Download, Grid, Layers } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { Badge } from '../components/common/Badge';
import { CardContainer } from '../components/common/Card';
import { MOCK_VISUAL_ASSETS } from '../services/mockData';

export const ImagenesPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Suite IA' }, { label: 'Imágenes & Material Visual' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Banco de Recursos Visuales IA</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generación de banners, infografías y piezas gráficas personalizadas para campañas de prospección.
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition">
          + Generar Asset con Imagen IA
        </button>
      </div>

      <FilterBar statusOptions={['TODOS', 'Generado', 'En Cola', 'Error']} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_VISUAL_ASSETS.map((asset) => (
          <div
            key={asset.id}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="relative h-44 bg-slate-950 overflow-hidden group">
              <img
                src={asset.url}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="blue">{asset.category}</Badge>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">{asset.title}</h3>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Dimensiones: {asset.dimensions}</span>
                <span>{asset.createdAt}</span>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <Badge variant="emerald">{asset.status}</Badge>
                <button className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>Descargar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
