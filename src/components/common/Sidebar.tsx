import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Target, 
  BrainCircuit, 
  FileCheck2, 
  Image as ImageIcon, 
  FileText, 
  Megaphone, 
  MessageSquare, 
  Bot, 
  Briefcase, 
  BarChart3, 
  BellRing, 
  Users, 
  Settings, 
  Activity, 
  Terminal,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  GitMerge
} from 'lucide-react';
import { AsysLogo } from './AsysLogo';

export interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface NavSection {
  title: string;
  items: {
    name: string;
    path: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  // Menu reorganized by business process as requested
  const navigation: NavSection[] = [
    {
      title: 'PROCESOS DE NEGOCIO',
      items: [
        { name: 'Inicio', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Empresas', path: '/empresas', icon: Building2 },
        { name: 'Prospección', path: '/prospeccion', icon: Target },
        { name: 'Auditorías', path: '/auditor-ia', icon: BrainCircuit, badge: 'IA' },
        { name: 'Diagnósticos', path: '/diagnosticos', icon: FileCheck2 },
        { name: 'Campañas', path: '/campanas', icon: Megaphone },
        { name: 'Automatizaciones', path: '/automatizaciones', icon: GitMerge, badge: 'n8n' },
      ],
    },
    {
      title: 'INTERACCIÓN & COMERCIAL',
      items: [
        { name: 'Conversaciones', path: '/whatsapp', icon: MessageSquare, badge: 'API' },
        { name: 'IA Conversacional', path: '/ia-conversacional', icon: Bot },
        { name: 'CRM', path: '/crm', icon: Briefcase },
        { name: 'Analítica', path: '/analitica', icon: BarChart3 },
      ],
    },
    {
      title: 'GESTIÓN & DOCUMENTOS',
      items: [
        { name: 'Documentos', path: '/documentos', icon: FileText },
        { name: 'Imágenes IA', path: '/imagenes', icon: ImageIcon },
      ],
    },
    {
      title: 'SISTEMA & GOVERNANCE',
      items: [
        { name: 'Configuración', path: '/configuracion', icon: Settings },
        { name: 'Usuarios', path: '/usuarios', icon: Users },
        { name: 'Logs', path: '/logs', icon: Terminal },
        { name: 'Estado del Sistema', path: '/estado-sistema', icon: Activity, badge: '99.9%' },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-[#070a12] border-r border-slate-800/80 text-slate-300 transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Brand Header with ASYS Technology Branding */}
        <div className="h-16 px-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/60">
          {!collapsed ? (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/dashboard')}>
              <AsysLogo size="sm" variant="full" />
            </div>
          ) : (
            <div className="mx-auto cursor-pointer" onClick={() => onNavigate('/dashboard')}>
              <AsysLogo size="sm" variant="icon" />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="p-3 overflow-y-auto max-h-[calc(100vh-8.5rem)] space-y-5 custom-scrollbar">
          {navigation.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <h3 className="px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                  {section.title}
                </h3>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    title={collapsed ? item.name : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                      {!collapsed && <span>{item.name}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          item.badge === 'API'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : item.badge === 'IA'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Org Info */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80">
        {!collapsed ? (
          <div className="space-y-1 text-center">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>ASYS Intelligence</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500 font-bold">v1.2.0</span>
            </div>
            <p className="text-[9px] text-slate-500 font-mono">ASYS Technology S.A.S. © 2026</p>
          </div>
        ) : (
          <ShieldCheck className="w-4 h-4 text-blue-400 mx-auto" />
        )}
      </div>
    </aside>
  );
};

