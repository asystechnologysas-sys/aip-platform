export type EventType =
  | 'EMPRESA_CREADA'
  | 'AUDITORIA_COMPLETADA'
  | 'DIAGNOSTICO_GENERADO'
  | 'CAMPANA_LANZADA'
  | 'WHATSAPP_ENVIADO'
  | 'CRM_ACTUALIZADO'
  | 'WORKFLOW_EJECUTADO'
  | 'AI_ROUTER_DESPACHADO'
  | 'KNOWLEDGE_BASE_INDEXADA';

export type EventPriority = 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA';
export type EventStatus = 'PENDIENTE' | 'PROCESANDO' | 'EXITO' | 'FALLIDO' | 'REINTENTANDO';

export interface DomainEventPayload<T = any> {
  id: string;
  eventType: EventType;
  priority: EventPriority;
  source: string;
  destination: string;
  timestamp: string;
  status: EventStatus;
  retryCount: number;
  traceId: string;
  executionTimeMs?: number;
  payload: T;
  result?: any;
}

type EventHandler<T = any> = (event: DomainEventPayload<T>) => void;

class DomainEventBus {
  private handlers: Map<EventType, Set<EventHandler>> = new Map();
  private history: DomainEventPayload[] = [];

  constructor() {
    this.history = [
      {
        id: 'evt_101',
        eventType: 'EMPRESA_CREADA',
        priority: 'ALTA',
        source: 'Apify B2B Scraper Worker',
        destination: 'AI Router Engine',
        timestamp: new Date(Date.now() - 1000 * 60 * 18).toLocaleTimeString('es-CO'),
        status: 'EXITO',
        retryCount: 0,
        traceId: 'trace-889a-01',
        executionTimeMs: 420,
        payload: { nit: '900123456-1', name: 'Alpina Productos Alimenticios', sector: 'Alimentos' },
        result: { status: 'PROCESADA', assignedRoute: 'gemini-1.5-pro' },
      },
      {
        id: 'evt_102',
        eventType: 'AI_ROUTER_DESPACHADO',
        priority: 'CRITICA',
        source: 'AI Router Controller',
        destination: 'Gemini 1.5 Pro Worker',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString('es-CO'),
        status: 'EXITO',
        retryCount: 0,
        traceId: 'trace-889a-01',
        executionTimeMs: 1250,
        payload: { task: 'audit', prompt: 'Auditar presencia digital de Alpina...' },
        result: { score: 94, techStackCount: 12, costUsd: 0.0012 },
      },
      {
        id: 'evt_103',
        eventType: 'DIAGNOSTICO_GENERADO',
        priority: 'MEDIA',
        source: 'PDF Report Generator',
        destination: 'WhatsApp Cloud API Manager',
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toLocaleTimeString('es-CO'),
        status: 'EXITO',
        retryCount: 0,
        traceId: 'trace-889a-01',
        executionTimeMs: 3400,
        payload: { reportId: 'REP-2026-8821', pdfSizeMb: 2.8, companyNit: '900123456-1' },
        result: { url: 'https://cdn.asys.app/reports/REP-2026-8821.pdf' },
      },
      {
        id: 'evt_104',
        eventType: 'WHATSAPP_ENVIADO',
        priority: 'ALTA',
        source: 'WhatsApp Cloud API HSM Worker',
        destination: 'CRM Pipeline Engine',
        timestamp: new Date(Date.now() - 1000 * 60 * 4).toLocaleTimeString('es-CO'),
        status: 'EXITO',
        retryCount: 1,
        traceId: 'trace-889a-01',
        executionTimeMs: 890,
        payload: { phone: '+573009876543', template: 'DIAGNOSTICO_EJECUTIVO_V2' },
        result: { messageId: 'wamid.HBgLMDU3MzAwOTg3NjU0M1UC' },
      },
      {
        id: 'evt_105',
        eventType: 'WORKFLOW_EJECUTADO',
        priority: 'MEDIA',
        source: 'Celery Dead Letter Queue',
        destination: 'CRM Redis Sync',
        timestamp: new Date(Date.now() - 1000 * 60 * 1).toLocaleTimeString('es-CO'),
        status: 'REINTENTANDO',
        retryCount: 2,
        traceId: 'trace-991b-04',
        executionTimeMs: 1800,
        payload: { syncTarget: 'Hubspot / Salesforce Webhook' },
        result: { error: 'HTTP 429 Rate Limit - Reintentando con Backoff Exponencial' },
      },
    ];
  }

  public subscribe<T = any>(type: EventType, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler);

    return () => {
      this.handlers.get(type)?.delete(handler);
    };
  }

  public publish<T = any>(
    eventType: EventType, 
    source: string, 
    destination: string, 
    payload: T, 
    options?: { priority?: EventPriority; traceId?: string }
  ): DomainEventPayload<T> {
    const traceId = options?.traceId || `trace-${Math.random().toString(36).substring(2, 8)}`;
    const event: DomainEventPayload<T> = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      eventType,
      priority: options?.priority || 'MEDIA',
      source,
      destination,
      timestamp: new Date().toLocaleTimeString('es-CO'),
      status: 'EXITO',
      retryCount: 0,
      traceId,
      executionTimeMs: Math.floor(Math.random() * 800) + 150,
      payload,
    };

    this.history.unshift(event);
    if (this.history.length > 100) this.history.pop();

    const listeners = this.handlers.get(eventType);
    if (listeners) {
      listeners.forEach((handler) => handler(event));
    }

    return event;
  }

  public getHistory(): DomainEventPayload[] {
    return [...this.history];
  }
}

export const domainEventBus = new DomainEventBus();
