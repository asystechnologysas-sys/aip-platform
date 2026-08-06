import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Globe, 
  MapPin, 
  Users, 
  Award, 
  ExternalLink, 
  Phone, 
  Mail, 
  ShieldCheck, 
  BrainCircuit, 
  FileCheck2, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Calendar, 
  Plus, 
  Send, 
  Sparkles,
  Share2,
  Clock,
  CheckCircle2,
  GitMerge,
  Database,
  Search,
  Cpu,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { Empresa } from '../../types';
import { Badge } from '../common/Badge';
import { VisualWorkflowBuilder } from '../automation/VisualWorkflowBuilder';
import { knowledgeCenter, KnowledgeDocument, SearchResult } from '../../core/knowledge/KnowledgeCenter';
import { aiRouter } from '../../core/ai/AIRouter';

interface EmpresaExpedienteModalProps {
  empresa: Empresa | null;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const EmpresaExpedienteModal: React.FC<EmpresaExpedienteModalProps> = ({
  empresa,
  onClose,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<
    'general' | 'knowledge' | 'workflow' | 'airouter' | 'ubicacion' | 'tech' | 'auditorias' | 'diagnosticos' | 'conversaciones' | 'crm' | 'notas' | 'timeline'
  >('general');

  const [notes, setNotes] = useState<string[]>([
    'Reunión inicial de cualificación agendada con el Gerente de TI.',
    'Interesados en la automatización de flujos de facturación y bot de WhatsApp para servicio al cliente.',
  ]);
  const [newNote, setNewNote] = useState('');

  // Knowledge Base State
  const [ragQuery, setRagQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchingRag, setIsSearchingRag] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocContent, setNewDocContent] = useState('');
  const [showAddDocForm, setShowAddDocForm] = useState(false);

  // AI Router State
  const [customPrompt, setCustomPrompt] = useState('');
  const [taskType, setTaskType] = useState<'audit' | 'code' | 'summary' | 'copywriting' | 'classification'>('audit');
  const [routerOutput, setRouterOutput] = useState<any>(null);
  const [isRouting, setIsRouting] = useState(false);

  if (!empresa) return null;

  const docs = knowledgeCenter.getDocumentsByEmpresa(empresa.nit);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes([newNote, ...notes]);
    setNewNote('');
  };

  const handleRagSearch = () => {
    if (!ragQuery.trim()) return;
    setIsSearchingRag(true);
    setTimeout(() => {
      const results = knowledgeCenter.queryVectorDB(empresa.nit, ragQuery);
      setSearchResults(results);
      setIsSearchingRag(false);
    }, 400);
  };

  const handleAddKnowledgeDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !newDocContent.trim()) return;
    knowledgeCenter.addDocument({
      empresaNit: empresa.nit,
      title: newDocTitle,
      type: 'INTERNAL_NOTE',
      content: newDocContent,
    });
    setNewDocTitle('');
    setNewDocContent('');
    setShowAddDocForm(false);
  };

  const handleRunAiRouter = async () => {
    if (!customPrompt.trim()) return;
    setIsRouting(true);
    const resp = await aiRouter.dispatch(taskType, customPrompt, { empresaNit: empresa.nit });
    setRouterOutput(resp);
    setIsRouting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800/80 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden transition-all">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
              {empresa.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {empresa.name}
                </h2>
                <Badge
                  variant={
                    empresa.status === 'Cliente'
                      ? 'emerald'
                      : empresa.status === 'Auditado'
                      ? 'blue'
                      : empresa.status === 'En Prospección'
                      ? 'purple'
                      : 'slate'
                  }
                >
                  {empresa.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono">NIT: {empresa.nit}</span>
                <span>•</span>
                <span>Sector: {empresa.industry}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  {empresa.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Score IA: {empresa.score}/100</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs Navigation */}
        <div className="flex items-center gap-1 px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/30 overflow-x-auto text-xs py-2 custom-scrollbar">
          {[
            { id: 'general', label: 'General', icon: Building2 },
            { id: 'knowledge', label: 'Knowledge Base (Vector DB)', icon: Database, badge: 'RAG' },
            { id: 'workflow', label: 'Flujo Orquestado (n8n)', icon: GitMerge, badge: 'Workflow' },
            { id: 'airouter', label: 'AI Router Inteligente', icon: Cpu, badge: 'Router' },
            { id: 'ubicacion', label: 'Ubicación & GPS', icon: MapPin },
            { id: 'tech', label: 'Tech Stack Profiler', icon: Globe },
            { id: 'auditorias', label: 'Auditoría IA', icon: BrainCircuit },
            { id: 'diagnosticos', label: 'Diagnósticos PDF', icon: FileCheck2 },
            { id: 'conversaciones', label: 'WhatsApp & HSM', icon: MessageSquare },
            { id: 'crm', label: 'CRM & Pipeline', icon: Briefcase },
            { id: 'notas', label: 'Notas & Archivos', icon: FileText },
            { id: 'timeline', label: 'Timeline Real-time', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 mb-1 font-medium">NIT / Registro Mercantil</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
                    {empresa.nit}
                  </div>
                  <div className="text-[11px] text-emerald-500 font-semibold mt-1">Cámara de Comercio Verificada</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 mb-1 font-medium font-sans">Nivel de Empleados</div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{empresa.employees} colaboradores</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Segmento Mediana Empresa</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 mb-1 font-medium">Sitio Web Oficial</div>
                  <a
                    href={empresa.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-bold text-blue-500 hover:underline flex items-center gap-1.5"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{empresa.website.replace('https://', '')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <div className="text-[11px] text-emerald-500 font-semibold mt-1">SSL Activo • HTTPS</div>
                </div>
              </div>

              {/* Resumen de Inteligencia B2B */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Resumen de Inteligencia Comercial ASYS (Apify + Gemini)</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {empresa.name} es una compañía líder en el sector {empresa.industry} ubicada en {empresa.location}.
                  Posee un índice de madurez digital del <strong className="text-blue-400">{empresa.score}%</strong>.
                  Presenta alta oportunidad para implementación de soluciones de automatización de procesos,
                  agentes conversacionales para clientes y auditoría de documentos con Inteligencia Artificial.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    <span>Knowledge Center & Base de Vectores (RAG Vector DB)</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Memoria corporativa indexada para el Copilot Agente Autónomo.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddDocForm(!showAddDocForm)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Indexar Nuevo Documento</span>
                </button>
              </div>

              {/* Add Knowledge Doc Form */}
              {showAddDocForm && (
                <form onSubmit={handleAddKnowledgeDoc} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-200">Indexar Documento o Nota en la Vector DB</h4>
                  <input
                    type="text"
                    placeholder="Título del documento (ej: 'Políticas de Crédito y Descuentos')"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    rows={3}
                    placeholder="Contenido o extracto del documento para generar embeddings..."
                    value={newDocContent}
                    onChange={(e) => setNewDocContent(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddDocForm(false)}
                      className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      Indexar con text-embedding-004
                    </button>
                  </div>
                </form>
              )}

              {/* RAG Query Simulator */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-300 block">Probar Búsqueda Semántica Vectorial (Cosines Similarity)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    placeholder="ej: ¿Qué dijeron sobre la atención al cliente en WhatsApp o reseña?"
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleRagSearch}
                    disabled={isSearchingRag}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5"
                  >
                    {isSearchingRag ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    <span>Consultar RAG</span>
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="space-y-2 mt-2 pt-2 border-t border-slate-800">
                    <div className="text-[10px] font-mono text-emerald-400">Coincidencias Semánticas Encontradas:</div>
                    {searchResults.map((res, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-400">{res.documentTitle}</span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                            Similitud: {(res.similarityScore * 100).toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 italic">"{res.textSnippet}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Document List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase">Documentos Indexados ({docs.length})</h4>
                {docs.map((doc) => (
                  <div key={doc.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-100">{doc.title}</span>
                        <Badge variant="blue">{doc.type}</Badge>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{doc.content}</p>
                      <div className="text-[10px] text-slate-500 font-mono flex items-center gap-3">
                        <span>Chunks: {doc.vectorChunksCount}</span>
                        <span>•</span>
                        <span>Modelo: {doc.embeddingModel}</span>
                        <span>•</span>
                        <span>{doc.indexedAt}</span>
                      </div>
                    </div>
                    <Badge variant="emerald">INDEXED</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <VisualWorkflowBuilder companyNit={empresa.nit} />
          )}

          {activeTab === 'airouter' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <span>AI Router Dinámico Multi-Modelo</span>
                </div>
                <p className="text-xs text-slate-300">
                  El AI Router analiza automáticamente el tipo de tarea y la delega al modelo ideal:
                  <strong className="text-blue-400"> Gemini 1.5 Pro</strong> (Resúmenes & Auditoría),
                  <strong className="text-purple-400"> Claude 3.5 Sonnet</strong> (Código & Lógica),
                  <strong className="text-emerald-400"> DeepSeek V3</strong> (Clasificación ultra rápida),
                  <strong className="text-amber-400 font-medium"> GPT-4o</strong> (Copywriting).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-200">Probar Despacho de Tarea en AI Router</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase">Tipo de Tarea</label>
                    <select
                      value={taskType}
                      onChange={(e) => setTaskType(e.target.value as any)}
                      className="w-full mt-1 px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-purple-500"
                    >
                      <option value="audit">Auditoría &amp; Análisis Estratégico → Gemini 1.5 Pro</option>
                      <option value="code">Sintaxis, Código &amp; Integraciones → Claude 3.5 Sonnet</option>
                      <option value="copywriting">Redactado Persuasivo WhatsApp → GPT-4o</option>
                      <option value="classification">Clasificación &amp; Scoring → DeepSeek V3</option>
                      <option value="summary">Resumen de Diagnóstico PDF → Gemini 1.5 Pro</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase">Instrucción / Prompt</label>
                    <input
                      type="text"
                      placeholder="ej: Generar plantilla de WhatsApp para Gerente de TI"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleRunAiRouter}
                    disabled={isRouting}
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition flex items-center gap-1.5"
                  >
                    {isRouting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>Despachar Tarea en Router</span>
                  </button>
                </div>

                {routerOutput && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-400 font-bold">Modelo Seleccionado: {routerOutput.route.selectedModel}</span>
                      <span className="text-slate-400">Latencia: {routerOutput.executionTimeMs}ms • Costo: ${routerOutput.actualCostUsd.toFixed(5)} USD</span>
                    </div>
                    <p className="text-xs text-slate-300 italic">{routerOutput.text}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Razón de Selección: {routerOutput.route.reasoning}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ubicacion' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Sede Principal</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{empresa.location}, Colombia</p>
                  <p className="text-xs text-slate-400">Zona Industrial Norte - Carrera 45 # 120-30</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Contacto Directivo</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">Carlos Rodríguez (Gerente de Operaciones)</p>
                  <p className="text-xs text-blue-400 font-mono">crodriguez@{empresa.website.replace('https://www.', '')}</p>
                </div>
              </div>

              {/* Simulated Map */}
              <div className="h-48 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="text-center z-10 space-y-2">
                  <MapPin className="w-8 h-8 text-blue-500 mx-auto animate-bounce" />
                  <span className="text-xs font-mono text-slate-300 block">GPS: 4.6097° N, 74.0817° W • {empresa.location}</span>
                  <Badge variant="blue">Geolocalización Confirmada</Badge>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold">Tecnologías Detectadas (Tech Stack Profiler)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'CMS & Framework', val: 'WordPress 6.4 + React', status: 'Moderno' },
                  { name: 'Analytics', val: 'Google Analytics 4', status: 'Activo' },
                  { name: 'E-commerce', val: 'WooCommerce / Stripe', status: 'Integrado' },
                  { name: 'Infraestructura', val: 'Cloudflare CDN + Nginx', status: 'Optimizado' },
                ].map((t, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="text-slate-500 block text-[10px]">{t.name}</span>
                    <span className="font-bold text-slate-100 block mt-1">{t.val}</span>
                    <span className="text-[10px] text-emerald-400 font-medium">{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'auditorias' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-purple-400" />
                    Auditoría IA de Madurez Digital (Gemini 1.5 Pro)
                  </span>
                  <Badge variant="purple">Completada</Badge>
                </div>
                <p className="text-xs text-slate-300">
                  Puntaje Global: <strong className="text-purple-400 font-mono text-sm">{empresa.score}/100 pts</strong>.
                  Procesos automatizables detectados: 8 flujos de trabajo.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'diagnosticos' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold">Informes Ejecutivos Generados en PDF</h3>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileCheck2 className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="font-bold text-xs">Diagnostico_Estrategico_{empresa.name.replace(/\s+/g, '_')}_2026.pdf</div>
                    <div className="text-[10px] text-slate-400">14 páginas • 3.2 MB • Generado hace 2 días</div>
                  </div>
                </div>
                <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white">
                  Descargar PDF
                </button>
              </div>
            </div>
          )}

          {activeTab === 'conversaciones' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                  <div>
                    <div className="font-bold text-xs">Canal Meta WhatsApp Cloud API</div>
                    <div className="text-[10px] text-slate-400">Última interacción: Hace 1 hora (Agente Conversacional ASYS Bot)</div>
                  </div>
                </div>
                <Badge variant="emerald">En Conversación</Badge>
              </div>
            </div>
          )}

          {activeTab === 'crm' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="font-bold text-xs">Oportunidad: Automatización de Flujos Empresariales</div>
                    <div className="text-[10px] text-slate-400">Etapa: Presentación de Diagnóstico • Probabilidad: 75%</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-400 text-sm">$18,500,000 COP</span>
              </div>
            </div>
          )}

          {activeTab === 'notas' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Escriba una nota o actualización sobre esta empresa..."
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddNote}
                  className="px-3 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar
                </button>
              </div>

              <div className="space-y-2">
                {notes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-3 pl-4 border-l-2 border-blue-500/30">
              {[
                { date: 'Hoy, 10:15 AM', text: 'Nota agregada: Seguimiento agendado con el equipo de TI.' },
                { date: 'Ayer, 03:40 PM', text: 'Informe Diagnóstico PDF enviado via WhatsApp Cloud API.' },
                { date: 'Hace 3 días', text: 'Auditoría IA ejecutada con Gemini 1.5 Pro. Puntaje: ' + empresa.score + ' pts.' },
                { date: 'Hace 5 días', text: 'Empresa extraída mediante scraper B2B Apify desde la Cámara de Comercio.' },
              ].map((item, idx) => (
                <div key={idx} className="relative pl-4 pb-3">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-slate-950" />
                  <div className="text-[10px] text-slate-500 font-mono">{item.date}</div>
                  <div className="text-xs font-medium text-slate-200 mt-0.5">{item.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono">
            Expediente ID: EXP-{empresa.id.toUpperCase()}
          </div>
          <div className="flex items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => {
                  onClose();
                  onNavigate('/auditor-ia');
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition flex items-center gap-1.5"
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Ejecutar Nueva Auditoría</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
            >
              Cerrar Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
