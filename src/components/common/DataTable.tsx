import React from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { LoadingSkeleton } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { useFilterStore } from '../../store/useFilterStore';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  keyField: keyof T;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  keyField,
  onRowClick,
  emptyTitle,
  emptyDescription,
}: DataTableProps<T>) {
  const { simulateEmpty, simulateLoading } = useFilterStore();
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 6;

  const effectiveLoading = isLoading || simulateLoading;
  const effectiveData = simulateEmpty ? [] : data;

  const totalPages = Math.ceil(effectiveData.length / pageSize) || 1;
  const paginatedData = effectiveData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (effectiveLoading) {
    return <LoadingSkeleton rows={5} />;
  }

  if (effectiveData.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {col.sortable && <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60 hover:opacity-100 cursor-pointer" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {paginatedData.map((row) => (
              <tr
                key={String(row[keyField])}
                onClick={() => onRowClick && onRowClick(row)}
                className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-800 dark:text-slate-200">
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div>
          Mostrando <span className="font-semibold text-slate-800 dark:text-slate-200">
            {Math.min((currentPage - 1) * pageSize + 1, effectiveData.length)}
          </span> a <span className="font-semibold text-slate-800 dark:text-slate-200">
            {Math.min(currentPage * pageSize, effectiveData.length)}
          </span> de <span className="font-semibold text-slate-800 dark:text-slate-200">{effectiveData.length}</span> resultados
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 rounded border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1 rounded border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
