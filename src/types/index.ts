export type Role = 'Administrador' | 'Operador' | 'Invitado';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  permissions: string[];
  department?: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Enterprise {
  id: string;
  nit: string;
  name: string;
  industry: string;
  employees: string;
  location: string;
  score: number;
  status: 'Sin Analizar' | 'Auditado' | 'En Prospección' | 'Cliente';
  website: string;
  createdAt: string;
}

export interface Prospect {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  stage: 'Lead Contactado' | 'Diagnóstico Enviado' | 'En Negociación' | 'Cerrado Ganado' | 'Perdido';
  value: string;
  score: number;
  lastContact: string;
}

export interface AIAudit {
  id: string;
  enterpriseName: string;
  industry: string;
  readinessScore: number;
  digitalMaturity: 'Alta' | 'Media' | 'Baja';
  opportunitiesFound: number;
  status: 'Completado' | 'En Proceso' | 'Pendiente';
  date: string;
}

export interface Diagnostic {
  id: string;
  code: string;
  enterpriseName: string;
  version: string;
  pdfUrl?: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  recommendationsCount: number;
  createdAt: string;
  status: 'Borrador' | 'Enviado' | 'Aprobado';
}

export interface VisualAsset {
  id: string;
  title: string;
  category: 'Campaña' | 'Redes' | 'Diagnóstico' | 'Branding';
  dimensions: string;
  status: 'Generado' | 'En Cola' | 'Error';
  url: string;
  createdAt: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'Propuesta Comercial' | 'Informe Diagnóstico' | 'Contrato' | 'Plantilla';
  size: string;
  format: 'PDF' | 'DOCX';
  createdAt: string;
  author: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: 'Email' | 'WhatsApp' | 'LinkedIn' | 'Omnicanal';
  leadsCount: number;
  openRate: string;
  conversionRate: string;
  status: 'Activa' | 'Pausada' | 'Borrador' | 'Finalizada';
  startDate: string;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';
  language: string;
  status: 'APROBADO' | 'PENDIENTE' | 'RECHAZADO';
  lastUsed: string;
}

export interface ConversationalAgent {
  id: string;
  name: string;
  model: 'Gemini 1.5 Pro' | 'Claude 3.5 Sonnet' | 'GPT-4o';
  activeSessions: number;
  status: 'En Línea' | 'Mantenimiento' | 'Inactivo' | 'Standby';
  avgResponseTime: string;
}

export interface CRMDeal {
  id: string;
  title: string;
  company: string;
  amount: string;
  probability: string;
  stage: 'Cualificación' | 'Propuesta' | 'Negociación' | 'Cierre';
  owner: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  description: string;
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
  source: string;
}

export interface SystemServiceStatus {
  name: string;
  category: 'Core' | 'Database' | 'Cache' | 'Worker' | 'Gateway';
  status: 'Healthy' | 'Degraded' | 'Down' | 'Standby';
  latency: string;
  uptime: string;
  lastCheck: string;
}

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'DEBUG';
  service: 'application' | 'error' | 'access' | 'worker';
  message: string;
  details?: string;
  ip?: string;
}
