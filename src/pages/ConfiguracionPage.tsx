import React from 'react';
import { Settings, Key, Database, Server, Cpu, Globe, Save } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CardContainer } from '../components/common/Card';

export const ConfiguracionPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Administración' }, { label: 'Configuración General' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Parámetros del Sistema AIP</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ajustes globales de organización, llaves de API y límites de peticiones.
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition flex items-center gap-1.5">
          <Save className="w-3.5 h-3.5" />
          <span>Guardar Cambios (.env Sync)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Org Settings */}
        <CardContainer title="Datos de la Organización">
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1">Nombre Comercial</label>
              <input
                type="text"
                defaultValue="ASYS Technology SAS"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-medium mb-1">NIT / Identificación Fiscal</label>
              <input
                type="text"
                defaultValue="901.458.910-3"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-medium mb-1">Dominio Principal</label>
              <input
                type="text"
                defaultValue="https://platform.asysdigital.com"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
        </CardContainer>

        {/* Prepared Integration Secrets */}
        <CardContainer title="Variables de Entorno & API Keys (Secrets Manager)">
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1">GEMINI_API_KEY</label>
              <input
                type="password"
                defaultValue="••••••••••••••••••••••••••••••••"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-medium mb-1">WHATSAPP_CLOUD_API_TOKEN</label>
              <input
                type="password"
                defaultValue="••••••••••••••••••••••••••••••••"
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-medium mb-1">DATABASE_URL (PostgreSQL)</label>
              <input
                type="text"
                readOnly
                defaultValue="postgresql://postgres:***@postgresql:5432/asys_platform"
                className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-slate-400"
              />
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};
