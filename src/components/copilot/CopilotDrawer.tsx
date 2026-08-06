import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  BrainCircuit, 
  Filter, 
  Building2, 
  Megaphone, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Zap,
  Play,
  RotateCw,
  Globe,
  Cpu,
  MessageSquare,
  Database,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';
import { Badge } from '../common/Badge';

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

export interface AgentMissionStep {
  id: string;
  tool: 'APIFY' | 'AUDITOR_IA' | 'PDF_WORKER' | 'WHATSAPP' | 'CRM_SYNC' | 'KNOWLEDGE_BASE';
  label: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'ERROR';
  outputSnippet?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    action: () => void;
  };
  missionSteps?: AgentMissionStep[];
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentPath = '/dashboard',
}) => {
  const { setSearchTerm, setStatusFilter } = useFilterStore();
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: '¡Hola! Soy el **Agente Autónomo ASYS Copilot**. Puedo ejecutar misiones multietapa completas (Apify Scraper -> Auditoría IA -> PDF -> WhatsApp -> CRM) de forma autónoma sin que tengas que cambiar de pantalla.',
      timestamp: '10:00 AM',
    },
  ]);

  if (!isOpen) return null;

  const sampleAutonomousMissions = [
    {
      label: 'Misión: Prospectar Clínicas en Barranquilla',
      query: 'Busca clínicas en Barranquilla, extráelas con Apify, audítalas con Gemini, genera el PDF y notifica por WhatsApp.',
    },
    {
      label: 'Misión: Auditar Alimentos en Bogotá',
      query: 'Ejecuta pipeline completo para empresas de Alimentos en Bogotá: Apify -> Auditoría -> Diagnóstico PDF -> CRM.',
    },
    {
      label: 'Misión: Consultar Vector DB de Alpina',
      query: 'Consulta en la Knowledge Base los puntos débiles de Alpina y redacta mensaje de WhatsApp HSM.',
    },
  ];

  const handleRunMission = (userQuery: string) => {
    if (!userQuery.trim()) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: userQuery,
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    // Initial Agent Reply with Mission Plan
    const missionSteps: AgentMissionStep[] = [
      { id: 's1', tool: 'APIFY', label: '1. Scraper Apify: Extrayendo sitios web y Google Reviews...', status: 'RUNNING' },
      { id: 's2', tool: 'AUDITOR_IA', label: '2. AI Router + Gemini 1.5 Pro: Auditando madurez digital...', status: 'PENDING' },
      { id: 's3', tool: 'PDF_WORKER', label: '3. Celery PDF Worker: Renderizando informe ejecutivo de 14 págs...', status: 'PENDING' },
      { id: 's4', tool: 'WHATSAPP', label: '4. Meta WhatsApp Cloud API: Preparando plantilla HSM...', status: 'PENDING' },
      { id: 's5', tool: 'CRM_SYNC', label: '5. CRM Pipeline: Actualizando oportunidades B2B...', status: 'PENDING' },
    ];

    const agentMsgId = `a_${Date.now()}`;
    const agentMsg: ChatMessage = {
      id: agentMsgId,
      sender: 'assistant',
      text: 'Iniciando **Misión Autónoma E2E**. Planificador de Agente despachando sub-tareas en background:',
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      missionSteps: [...missionSteps],
    };

    setMessages((prev) => [...prev, agentMsg]);

    // Simulate Step-by-Step Autonomous Execution
    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < missionSteps.length) {
        missionSteps[currentStepIndex].status = 'SUCCESS';
        missionSteps[currentStepIndex].outputSnippet = 'Completado con éxito (0.8s latency)';
        
        currentStepIndex++;
        if (currentStepIndex < missionSteps.length) {
          missionSteps[currentStepIndex].status = 'RUNNING';
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === agentMsgId
              ? { ...msg, missionSteps: [...missionSteps] }
              : msg
          )
        );
      } else {
        clearInterval(interval);
        setIsProcessing(false);

        // Append Completion Summary
        setMessages((prev) => [
          ...prev,
          {
            id: `a_done_${Date.now()}`,
            sender: 'assistant',
            text: '🎉 **Misión Autónoma Completada sin abrir pantallas**. Se procesaron 5 prospectos, se generaron sus diagnósticos PDF y se agendó el seguimiento en el CRM.',
            timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
            actionButton: {
              label: 'Ver Empresas en el Expediente CRM',
              action: () => {
                if (onNavigate) onNavigate('/empresas');
                onClose();
              },
            },
          },
        ]);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-[#080c16] border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col transition-all">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
        <div className="flex items-center gap-2.5">
          <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs tracking-tight flex items-center gap-1.5">
              <span>Agente Autónomo ASYS</span>
              <Badge variant="purple">Autonomous Agent</Badge>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Multi-Tool Orchestrator • Gemini / Claude</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Mission Suggestions */}
      <div className="p-3 bg-slate-900/60 border-b border-slate-800 space-y-2">
        <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
          <Zap className="w-3 h-3" />
          <span>Misiones Autónomas Uniclic</span>
        </div>
        <div className="space-y-1.5">
          {sampleAutonomousMissions.map((m, idx) => (
            <button
              key={idx}
              onClick={() => handleRunMission(m.query)}
              className="w-full p-2 rounded-lg bg-slate-950/80 hover:bg-purple-900/30 text-left border border-slate-800 hover:border-purple-500/50 transition flex items-center justify-between text-[11px] group"
            >
              <span className="font-semibold text-slate-300 group-hover:text-purple-300">{m.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3.5 rounded-xl max-w-[92%] space-y-2.5 ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              <p className="leading-relaxed">{m.text}</p>

              {/* Agent Autonomous Mission Steps UI */}
              {m.missionSteps && m.missionSteps.length > 0 && (
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 mt-2">
                  <div className="text-[10px] font-mono text-purple-400 uppercase font-bold flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    <span>Ejecución de Sub-Tareas en Misión</span>
                  </div>

                  <div className="space-y-2">
                    {m.missionSteps.map((step) => (
                      <div key={step.id} className="text-[11px] flex items-start gap-2">
                        {step.status === 'SUCCESS' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {step.status === 'RUNNING' && (
                          <RotateCw className="w-4 h-4 text-amber-400 animate-spin shrink-0 mt-0.5" />
                        )}
                        {step.status === 'PENDING' && (
                          <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0 mt-0.5" />
                        )}

                        <div>
                          <span className={step.status === 'SUCCESS' ? 'text-slate-200 font-medium' : 'text-slate-400'}>
                            {step.label}
                          </span>
                          {step.outputSnippet && (
                            <span className="block text-[10px] font-mono text-emerald-400 mt-0.5">
                              {step.outputSnippet}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {m.actionButton && (
                <button
                  onClick={m.actionButton.action}
                  className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition"
                >
                  <span>{m.actionButton.label}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 font-mono">{m.timestamp}</span>
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-center gap-2 text-purple-300 text-xs italic p-2.5 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
            <span>Agente Autónomo coordinando Apify, AI Router y WhatsApp...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRunMission(inputQuery)}
            placeholder="Orden al agente (ej: 'Buscar clínicas en Barranquilla...')"
            className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => handleRunMission(inputQuery)}
            className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
