import React from 'react';

interface AsysLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'badge';
  darkTheme?: boolean;
}

export const AsysLogo: React.FC<AsysLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  darkTheme = true,
}) => {
  // Dimensions according to size
  const iconSize = size === 'sm' ? 28 : size === 'md' ? 36 : size === 'lg' ? 48 : 64;

  if (variant === 'icon') {
    return (
      <div
        style={{ width: iconSize, height: iconSize }}
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/40 shadow-lg shadow-blue-500/20 p-1.5 ${className}`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="46" stroke="#2563eb" strokeWidth="4" opacity="0.8" />
          <circle cx="50" cy="50" r="42" stroke="#1e293b" strokeWidth="2" />
          
          {/* Main "A" Symbol */}
          <path
            d="M 50 16 L 24 68 H 38 L 50 40 L 62 68 H 76 L 50 16 Z"
            fill="#0f172a"
            stroke="#2563eb"
            strokeWidth="3"
          />
          {/* Top Blue Accent Triangle */}
          <path d="M 50 18 L 62 42 H 50 Z" fill="#3b82f6" />
          
          {/* Curved Horizon Arc */}
          <path
            d="M 22 56 Q 50 36 78 56"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Round Emblem matching image branding */}
      <div
        style={{ width: iconSize, height: iconSize }}
        className="relative shrink-0 flex items-center justify-center rounded-full bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/40 shadow-md shadow-blue-500/20 p-1"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="#2563eb" strokeWidth="3" opacity="0.9" />
          <circle cx="50" cy="50" r="41" stroke="#334155" strokeWidth="1.5" />
          {/* Main "A" Chevron */}
          <path
            d="M 50 16 L 24 68 H 38 L 50 40 L 62 68 H 76 L 50 16 Z"
            fill="#0f172a"
            stroke="#3b82f6"
            strokeWidth="2.5"
          />
          <path d="M 50 18 L 62 42 H 50 Z" fill="#2563eb" />
          <path d="M 22 56 Q 50 36 78 56" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${darkTheme ? 'text-white' : 'text-slate-900'} ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'}`}>
            ASYS <span className="text-blue-500 font-extrabold">TECHNOLOGY</span>
          </span>
          <span className="text-[10px] font-bold text-blue-400 tracking-wider">
            S.A.S.
          </span>
        </div>
        <span className={`text-[9px] font-semibold tracking-wider uppercase mt-1 ${darkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
          AUTOMATIZACIÓN • SOLUCIONES • SISTEMAS
        </span>
      </div>
    </div>
  );
};
