import React from 'react';
import { Terminal, Filter, Download, Trash2, ShieldAlert } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CardContainer } from '../components/common/Card';
import { MOCK_SYSTEM_LOGS } from '../services/mockData';

export const LogsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = React.useState<'all' | 'application' | 'error' | 'access' | 'worker'>('all');

  const filteredLogs = MOCK_SYSTEM_LOGS.filter(
    (log) => activeTab === 'all' || log.service === activeTab
  );

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Sistema' }, { label: 'Logs de Auditoría & Consola' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Logs del Sistema (Structured Logging)</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Visualizador unificado de logs segmentados por arquitectura Clean Architecture (Application, Error, Access, Worker).
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Log Stream</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'all', label: 'Todos los Logs' },
          { id: 'application', label: 'Application Logs' },
          { id: 'error', label: 'Error Logs' },
          { id: 'access', label: 'Access Logs' },
          { id: 'worker', label: 'Worker Logs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Terminal Display */}
      <CardContainer title="Consola de Logs en Tiempo Real">
        <div className="bg-[#030712] text-slate-200 font-mono text-xs p-4 rounded-xl border border-slate-800 min-h-[360px] space-y-3 overflow-x-auto">
          {filteredLogs.length === 0 ? (
            <div className="text-slate-500 text-center py-12">No hay entradas para la categoría seleccionada.</div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="p-2 rounded bg-slate-900/50 border border-slate-800/60 space-y-1">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-slate-500">{log.timestamp}</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                      log.level === 'ERROR'
                        ? 'bg-rose-500/20 text-rose-400'
                        : log.level === 'WARNING'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-purple-400 font-bold">[{log.service.toUpperCase()}]</span>
                  {log.ip && <span className="text-slate-500">IP: {log.ip}</span>}
                </div>
                <div className="text-slate-100 font-semibold">{log.message}</div>
                {log.details && (
                  <pre className="text-[10px] text-rose-300 bg-rose-950/30 p-2 rounded border border-rose-900/40 overflow-x-auto">
                    {log.details}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>
      </CardContainer>
    </div>
  );
};
