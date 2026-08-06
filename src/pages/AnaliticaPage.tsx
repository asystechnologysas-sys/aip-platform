import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  ArrowUpRight, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Cpu, 
  MessageSquare, 
  FileText, 
  Users, 
  Sparkles,
  Calculator
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { MetricCard, CardContainer } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const AnaliticaPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [tab, setTab] = useState<'business' | 'performance'>('business');

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Analítica & BI' }, { label: 'Observabilidad de Negocio' }]} onNavigate={onNavigate} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Observabilidad de Negocio, Costos & ROI</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitoreo en tiempo real del costo por consumo de IA, mensajería, conversión de ventas y retorno neto en COP.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setTab('business')}
            className={`px-3 py-1.5 rounded-lg transition ${
              tab === 'business' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Observabilidad Financiera & ROI
          </button>
          <button
            onClick={() => setTab('performance')}
            className={`px-3 py-1.5 rounded-lg transition ${
              tab === 'performance' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rendimiento de Conversión B2B
          </button>
        </div>
      </div>

      {tab === 'business' ? (
        <div className="space-y-6">
          {/* Top Business Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Prospectos Calificados Hoy</span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">142 Empresas</div>
              <div className="text-[10px] text-emerald-400 font-semibold">+24.5% vs ayer</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mensajes WhatsApp Enviados</span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">1,280 HSM</div>
              <div className="text-[10px] text-slate-400 font-mono">Costo: $15.36 USD ($61,440 COP)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Costo Total IA Hoy</span>
              </div>
              <div className="text-xl font-bold font-mono text-purple-300">$4.82 USD</div>
              <div className="text-[10px] text-slate-400 font-mono">Gemini 65% • DeepSeek 20% • GPT 15%</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>ROI Neto Estimado</span>
              </div>
              <div className="text-xl font-bold font-mono text-emerald-400">14.2x</div>
              <div className="text-[10px] text-emerald-400 font-semibold">$54,200,000 COP en pipeline</div>
            </div>
          </div>

          {/* Detailed Cost Breakdown Table & Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardContainer title="Desglose de Costos de Infraestructura & AI Providers">
              <div className="space-y-3 pt-2">
                {[
                  { provider: 'Google Gemini 1.5 Pro', task: 'Auditorías IA & RAG', costUsd: 3.12, costCop: '12,480 COP', pct: 65, color: 'bg-purple-500' },
                  { provider: 'Meta WhatsApp Cloud API', task: 'Envíos HSM Outbound', costUsd: 15.36, costCop: '61,440 COP', pct: 82, color: 'bg-emerald-500' },
                  { provider: 'OpenAI GPT-4o', task: 'Redacción Persuasiva', costUsd: 0.95, costCop: '3,800 COP', pct: 20, color: 'bg-amber-500' },
                  { provider: 'DeepSeek V3 / R1', task: 'Clasificación Masiva', costUsd: 0.18, costCop: '720 COP', pct: 5, color: 'bg-sky-500' },
                  { provider: 'PDF Worker Cloud Run', task: 'Generación de Diagnósticos', costUsd: 0.57, costCop: '2,280 COP', pct: 12, color: 'bg-blue-500' },
                ].map((c, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between items-center font-bold text-slate-200">
                      <span>{c.provider}</span>
                      <span className="font-mono text-emerald-400">${c.costUsd.toFixed(2)} USD ({c.costCop})</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Uso: {c.task}</span>
                      <span className="font-mono">{c.pct}% de consumo diario</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContainer>

            <CardContainer title="Ganancias, Cierre de Clientes & Unit Economics">
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-between">
                    <span>Ventas Cerradas (Este Mes)</span>
                    <span className="font-mono text-sm">$84,500,000 COP</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    6 nuevos contratos B2B firmados a partir de diagnósticos automatizados entregados via WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">CAC Promedio</span>
                    <span className="text-base font-bold font-mono text-slate-100">$240,000 COP</span>
                    <span className="text-[10px] text-emerald-400 block">-35% gracias a IA</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">LTV Promedio</span>
                    <span className="text-base font-bold font-mono text-emerald-400">$18,500,000 COP</span>
                    <span className="text-[10px] text-slate-400 block">Contrato recurrente a 12 meses</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Margen Bruto de Operación</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">94.2 %</span>
                </div>
              </div>
            </CardContainer>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <MetricCard title="Conversion Rate" value="18.4%" change="+3.2%" isPositive={true} icon={BarChart3} />
            <MetricCard title="Tiempo Diagnóstico" value="1.4 min" change="-40%" isPositive={true} icon={LineChart} />
            <MetricCard title="Costo Adquisición (CAC)" value="$240,000 COP" change="-35%" isPositive={true} icon={PieChart} />
            <MetricCard title="ROI Prospección" value="14.2x" change="+2.4" isPositive={true} icon={ArrowUpRight} />
          </div>

          <FilterBar />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardContainer title="Distribución de Sectores Prospectados">
              <div className="space-y-3 pt-2">
                {[
                  { label: 'Manufactura e Industria', pct: 42, color: 'bg-blue-500' },
                  { label: 'Finanzas y Banca Digital', pct: 28, color: 'bg-emerald-500' },
                  { label: 'Salud y Biotecnología', pct: 18, color: 'bg-purple-500' },
                  { label: 'Tecnología y SaaS', pct: 12, color: 'bg-amber-500' },
                ].map((st, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{st.label}</span>
                      <span className="font-mono font-bold">{st.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className={`${st.color} h-full`} style={{ width: `${st.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContainer>

            <CardContainer title="Rendimiento Canales Outbound">
              <div className="space-y-3 pt-2">
                {[
                  { label: 'WhatsApp Cloud API', metric: '91% Apertura', tag: 'Top Channel' },
                  { label: 'LinkedIn Outbound', metric: '54% Respuesta', tag: 'High Ticket' },
                  { label: 'Email Secuencial', metric: '38% Apertura', tag: 'Standard' },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{c.label}</div>
                      <div className="text-[10px] text-slate-400">{c.metric}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold text-[10px]">{c.tag}</span>
                  </div>
                ))}
              </div>
            </CardContainer>
          </div>
        </div>
      )}
    </div>
  );
};
