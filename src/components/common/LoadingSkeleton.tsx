import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800/60 rounded-lg w-full flex items-center justify-between px-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/6" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/5" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/8" />
        </div>
      ))}
    </div>
  );
};
