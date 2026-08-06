import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  onNavigate: (href: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
      <button
        onClick={() => onNavigate('/dashboard')}
        className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200 transition"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Inicio</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
          {item.href && idx < items.length - 1 ? (
            <button
              onClick={() => onNavigate(item.href!)}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition"
            >
              {item.label}
            </button>
          ) : (
            <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
