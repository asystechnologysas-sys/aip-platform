export interface BackgroundTask {
  id: string;
  name: string;
  queue: 'scraping_queue' | 'audit_queue' | 'pdf_queue' | 'outreach_queue';
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  progress: number; // 0 to 100
  createdAt: string;
  eta: string;
  payload: Record<string, any>;
}

class TaskQueueManager {
  private tasks: BackgroundTask[] = [
    {
      id: 'task_001',
      name: 'Extracción de Empresas NIT Bogotá - Sector Alimentos',
      queue: 'scraping_queue',
      status: 'RUNNING',
      progress: 68,
      createdAt: '10:15 AM',
      eta: '1 min',
      payload: { nit_range: '900000000-900999999', target: 'Cámara de Comercio' },
    },
    {
      id: 'task_002',
      name: 'Auditoría Masiva con Gemini 1.5 Pro',
      queue: 'audit_queue',
      status: 'RUNNING',
      progress: 42,
      createdAt: '10:20 AM',
      eta: '2 min',
      payload: { companies_batch: 12, model: 'gemini-1.5-pro' },
    },
    {
      id: 'task_003',
      name: 'Compilación de Informe Diagnóstico PDF Ejecutivo',
      queue: 'pdf_queue',
      status: 'QUEUED',
      progress: 0,
      createdAt: '10:28 AM',
      eta: '4 min',
      payload: { company_id: 'emp_01', template: 'executive_v2' },
    },
  ];

  public getTasks(): BackgroundTask[] {
    return [...this.tasks];
  }

  public enqueueTask(
    name: string,
    queue: BackgroundTask['queue'],
    payload: Record<string, any>
  ): BackgroundTask {
    const newTask: BackgroundTask = {
      id: `task_${Date.now().toString(36)}`,
      name,
      queue,
      status: 'QUEUED',
      progress: 0,
      createdAt: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      eta: '3 min',
      payload,
    };
    this.tasks.unshift(newTask);
    return newTask;
  }
}

export const taskQueueManager = new TaskQueueManager();
