import React from 'react';
import { Search, Filter, RotateCcw, Calendar } from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';

interface FilterBarProps {
  statusOptions?: string[];
  industryOptions?: string[];
  onExport?: () => void;
  onNewAction?: () => void;
  newActionLabel?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  statusOptions = ['TODOS', 'Activo', 'Inactivo', 'Pendiente'],
  industryOptions = ['TODAS', 'Tecnología', 'Finanzas', 'Manufactura', 'Salud', 'Educación'],
  onExport,
  onNewAction,
  newActionLabel,
}) => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    industryFilter,
    setIndustryFilter,
    dateRange,
    setDateRange,
    resetFilters,
  } = useFilterStore();

  return (
    <div className="mb-6 p-4 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar registros..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Select */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  Estado: {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Select */}
          {industryOptions && (
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs">
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="bg-transparent text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer"
              >
                {industryOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    Sector: {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date Range Select */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="Ultimos 7 dias">Últimos 7 días</option>
              <option value="Ultimos 30 dias">Últimos 30 días</option>
              <option value="Este Trimestre">Este Trimestre</option>
              <option value="Año 2025">Año 2025</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
            title="Limpiar filtros"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* New Action / Export Buttons */}
          {onExport && (
            <button
              onClick={onExport}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
            >
              Exportar CSV
            </button>
          )}

          {newActionLabel && onNewAction && (
            <button
              onClick={onNewAction}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition"
            >
              + {newActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
