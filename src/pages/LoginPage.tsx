import React from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, KeyRound } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Role } from '../types';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = React.useState('admin@asysdigital.com');
  const [password, setPassword] = React.useState('••••••••••••');
  const [selectedRole, setSelectedRole] = React.useState<Role>('Administrador');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-500/20 mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">ASYS Intelligence Platform</h1>
          <p className="text-xs text-slate-400 mt-1">
            ASYS Technology SAS • Enterprise Management Engine
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Correo Electrónico Corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  placeholder="usuario@asysdigital.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
            </div>

            {/* Role Simulation Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Simular Rol de Acceso JWT</span>
                <span className="text-[10px] text-blue-400 font-normal">RBAC Enabled</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Administrador', 'Operador', 'Invitado'] as Role[]).map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition ${
                      selectedRole === r
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isLoading ? (
                <span>Autenticando token JWT...</span>
              ) : (
                <>
                  <span>Ingresar a la Plataforma</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Architectural Badge */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>OAuth2 Password Bearer Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
