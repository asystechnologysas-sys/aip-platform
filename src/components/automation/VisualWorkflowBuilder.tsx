import React, { useState } from 'react';
import { 
  GitMerge, 
  Play, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Zap, 
  Bot, 
  FileText, 
  MessageSquare, 
  Database, 
  Globe, 
  Cpu, 
  ArrowRight,
  Settings,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Badge } from '../common/Badge';

export interface WorkflowNode {
  id: string;
  type: 'TRIGGER' | 'SCRAPER' | 'AI_ROUTER' | 'PDF_WORKER' | 'WHATSAPP' | 'CRM_SYNC';
  title: string;
  description: string;
  engineModel?: string;
  status: 'IDLE' | 'RUNNING' | 'SUCCESS' | 'ERROR';
  executionTimeMs?: number;
  config: Record<string, any>;
}

export const VisualWorkflowBuilder: React.FC<{ companyNit?: string }> = ({ companyNit }) => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'node_1',
      type: 'TRIGGER',
      title: 'Disparador: Nueva Empresa Registrada',
      description: 'Escucha el evento EMPRESA_CREADA en Redis EventBus',
      status: 'SUCCESS',
      executionTimeMs: 12,
      config: { topic: 'events.company.created', priority: 'HIGH' },
    },
    {
      id: 'node_2',
      type: 'SCRAPER',
      title: 'Scraper B2B Apify + Google Maps',
      description: 'Extrae tech stack, sitio web, metadata e Google Reviews',
      status: 'SUCCESS',
      executionTimeMs: 1420,
      config: { maxPages: 5, extractTechStack: true },
    },
    {
      id: 'node_3',
      type: 'AI_ROUTER',
      title: 'AI Router (Multi-Model Switch)',
      description: 'Clasifica tarea y rutea automáticamente a Gemini 1.5 Pro',
      engineModel: 'Gemini 1.5 Pro',
      status: 'SUCCESS',
      executionTimeMs: 890,
      config: { task: 'audit', autoRoute: true },
    },
    {
      id: 'node_4',
      type: 'PDF_WORKER',
      title: 'Generador de Diagnóstico PDF',
      description: 'Renderiza informe ejecutivo de 14 páginas en Celery',
      status: 'SUCCESS',
      executionTimeMs: 3200,
      config: { template: 'DIAGNOSTICO_EJECUTIVO_V2', format: 'PDF_A' },
    },
    {
      id: 'node_5',
      type: 'WHATSAPP',
      title: 'WhatsApp HSM Dispatcher',
      description: 'Envía plantilla aprobada por Meta Cloud API con PDF adjunto',
      status: 'SUCCESS',
      executionTimeMs: 450,
      config: { templateName: 'diagnostico_disponible_v1', requireAck: true },
    },
    {
      id: 'node_6',
      type: 'CRM_SYNC',
      title: 'CRM Pipeline Updater',
      description: 'Sincroniza oportunidad comercial y genera tarea para SDR',
      status: 'IDLE',
      executionTimeMs: 0,
      config: { targetStage: 'Diagnóstico Entregado', scoreThreshold: 80 },
    },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(nodes[2]);

  const runWorkflow = () => {
    setIsRunning(true);
    setNodes((prev) => prev.map((n) => ({ ...n, status: 'RUNNING' })));

    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          status: 'SUCCESS',
          executionTimeMs: Math.floor(Math.random() * 800) + 150,
        }))
      );
      setIsRunning(false);
    }, 1200);
  };

  const getNodeIcon = (type: WorkflowNode['type']) => {
    switch (type) {
      case 'TRIGGER':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'SCRAPER':
        return <Globe className="w-4 h-4 text-sky-400" />;
      case 'AI_ROUTER':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'PDF_WORKER':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'WHATSAPP':
        return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'CRM_SYNC':
        return <Database className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GitMerge className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>Workflow Visual Engine (Estilo n8n)</span>
              <Badge variant="blue">Visual Pipeline</Badge>
            </h3>
            <p className="text-[11px] text-slate-400">
              {companyNit ? `Flujo orquestado para Empresa NIT: ${companyNit}` : 'Orquestación de flujos reactivos B2B'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runWorkflow}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
          >
            {isRunning ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isRunning ? 'Ejecutando Nodos...' : 'Probar Flujo Completo'}</span>
          </button>

          <button
            onClick={() => {
              const newNode: WorkflowNode = {
                id: `node_${Date.now()}`,
                type: 'AI_ROUTER',
                title: 'Nuevo Nodo de Proceso IA',
                description: 'Evaluación y filtrado adicional',
                status: 'IDLE',
                config: {},
              };
              setNodes([...nodes, newNode]);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Nodo</span>
          </button>
        </div>
      </div>

      {/* Visual Canvas & Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Nodes Canvas Column */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative overflow-hidden min-h-[380px]">
          <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Flujo de Ejecución Secuencial & Eventos</span>
            <span>6 Nodos Conectados</span>
          </div>

          <div className="space-y-3 relative z-10">
            {nodes.map((node, index) => (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    selectedNode?.id === node.id
                      ? 'bg-slate-900 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      {getNodeIcon(node.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-200">{node.title}</span>
                        {node.engineModel && (
                          <Badge variant="purple">{node.engineModel}</Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{node.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {node.executionTimeMs !== undefined && node.executionTimeMs > 0 && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {node.executionTimeMs}ms
                      </span>
                    )}

                    {node.status === 'SUCCESS' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {node.status === 'RUNNING' && (
                      <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                    )}
                    {node.status === 'IDLE' && (
                      <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                    )}
                  </div>
                </div>

                {index < nodes.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className="h-4 w-0.5 bg-gradient-to-b from-blue-500/50 to-slate-800 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-slate-500 rotate-90" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Node Inspector Sidebar */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-blue-400" />
              <span>Inspector de Nodo</span>
            </h4>
            {selectedNode && (
              <Badge variant="emerald">{selectedNode.type}</Badge>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Nombre del Nodo</label>
                <input
                  type="text"
                  value={selectedNode.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setNodes((prev) =>
                      prev.map((n) => (n.id === selectedNode.id ? { ...n, title: newTitle } : n))
                    );
                    setSelectedNode({ ...selectedNode, title: newTitle });
                  }}
                  className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Descripción</label>
                <textarea
                  value={selectedNode.description}
                  rows={2}
                  onChange={(e) => {
                    const newDesc = e.target.value;
                    setNodes((prev) =>
                      prev.map((n) => (n.id === selectedNode.id ? { ...n, description: newDesc } : n))
                    );
                    setSelectedNode({ ...selectedNode, description: newDesc });
                  }}
                  className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Payload de Configuración JSON</label>
                <pre className="mt-1 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                  {JSON.stringify(selectedNode.config, null, 2)}
                </pre>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => {
                    setNodes(nodes.filter((n) => n.id !== selectedNode.id));
                    setSelectedNode(null);
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar Nodo</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">Seleccione un nodo en el canvas para ver o modificar sus parámetros.</p>
          )}
        </div>
      </div>
    </div>
  );
};
