import React from 'react';
import { 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  ShieldAlert, 
  UserCheck, 
  LogOut, 
  ChevronDown,
  Activity,
  Zap
} from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useFilterStore } from '../../store/useFilterStore';
import { Role } from '../../types';

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, logout, switchRole } = useAuthStore();
  const { searchTerm, setSearchTerm, simulateEmpty, toggleSimulateEmpty, simulateLoading, toggleSimulateLoading } = useFilterStore();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-[#090d16] border-b border-slate-200 dark:border-slate-800/80 px-6 flex items-center justify-between transition-colors">
      {/* Search Input */}
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar empresas, diagnósticos, logs, módulos..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
      </div>

      {/* Middle Status Pill */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Sistema Operativo</span>
        <span className="text-slate-400 dark:text-slate-500 mx-1">|</span>
        <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">v1.0.0-architecture</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* State Simulation Helpers for testing empty/loading states */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
          <button
            onClick={toggleSimulateLoading}
            title="Simular Carga"
            className={`px-2 py-0.5 text-[11px] rounded font-medium transition ${
              simulateLoading
                ? 'bg-amber-500 text-white dark:text-slate-950'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Zap className="w-3 h-3 inline mr-1" />
            Carga
          </button>
          <button
            onClick={toggleSimulateEmpty}
            title="Simular Estado Vacío"
            className={`px-2 py-0.5 text-[11px] rounded font-medium transition ${
              simulateEmpty
                ? 'bg-blue-600 text-white'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Vacío
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition"
          title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
          </button>
        </div>

        {/* Role Selector Badge */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-slate-700 dark:text-slate-200">{user?.role}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50 text-xs">
              <div className="px-3 py-1.5 font-semibold text-slate-400 border-b border-slate-100 dark:border-slate-800">
                Cambiar Rol Activo
              </div>
              {(['Administrador', 'Operador', 'Invitado'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    user?.role === r ? 'text-blue-500 font-bold' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <span>{r}</span>
                  {user?.role === r && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {user?.name.substring(0, 2).toUpperCase() || 'AS'}
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{user?.name}</p>
                <p className="text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                <p className="mt-1 text-[10px] text-blue-500 font-medium">{user?.department}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => logout()}
                  className="w-full text-left px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Cerrar Sesión (JWT Clear)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
