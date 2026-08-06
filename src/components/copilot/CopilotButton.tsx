import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

interface CopilotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const CopilotButton: React.FC<CopilotButtonProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2 group border border-white/20"
      title="Abrir Copilot IA"
    >
      <div className="relative">
        <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
      </div>
      <span className="text-xs font-bold tracking-tight">Copilot IA</span>
      <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono font-bold">
        CMD + K
      </span>
    </button>
  );
};
