# ADR 0001: Arquitectura Base de ASYS Intelligence Platform (AIP)

* **Estatus**: Aprobado
* **Fecha**: 2026-08-04
* **Autores**: Principal Software Architect & Tech Lead (ASYS Technology S.A.S.)

## Contexto y Desafío de Negocio

ASYS Technology S.A.S. requiere una plataforma SaaS empresarial capaz de escalar horizontalmente para realizar descubrimiento B2B de empresas en Colombia y Latinoamérica, evaluarlas mediante Inteligencia Artificial (Gemini 1.5 Pro / GPT-4o), generar diagnósticos PDF ejecutivos, gestionar campañas automatizadas en WhatsApp Cloud API y convertir prospectos en clientes a través de un CRM integrado.

## Decisiones de Arquitectura

1. **Frontend Desacoplado**: React 19 + TypeScript + TailwindCSS v4. Navegación modular por procesos de negocio con estado global liviano mediante Zustand.
2. **Event-Driven Architecture (EDA)**: Implementación del patrón `DomainEventBus` para notificar en tiempo real eventos como `EMPRESA_CREADA`, `AUDITORIA_COMPLETADA` o `DIAGNOSTICO_GENERADO`.
3. **Background Worker Queues**: Adopción del patrón `TaskQueueManager` (Redis + Celery) para encolar tareas pesadas como extracción masiva con Apify, renderizado de PDF y envíos masivos por WhatsApp.
4. **Clean Architecture & Repository Pattern**: Separación clara entre modelos de datos, servicios de dominio, repositorios y capas de presentación.
5. **Copilot IA Ubicuo**: Panel de asistencia copiloto accesible en todas las vistas mediante un botón flotante global.

## Consecuencias Positivas

* Mantenibilidad del código sin acoplamiento rígido.
* Experiencia de usuario (UX) fluida y reactiva nivel Vercel / Linear / HubSpot.
* Preparación total para conectores de producción con PostgreSQL, Redis, FastAPI y APIs externas.
