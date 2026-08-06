# ASYS Intelligence Platform (AIP) - Technical Integration Roadmap

**Empresa:** ASYS Technology SAS  
**Documento de Planificación Arquitectónica**

---

## Fases de Desarrollo Futuras

### Fase 1: Consolidación de Infraestructura & Auth Real (Completada en esta entrega)
- [x] Estructura multimodular Clean Architecture (Frontend + Backend + Database + Docker).
- [x] Dashboard ejecutable interactivo con 18 páginas base y navegación completa.
- [x] Gestión de JWT tokens, Refresh Tokens, y Control de Acceso basado en Roles (RBAC: Administrador, Operador, Invitado).
- [x] Tablas base `usuarios`, `roles`, `permisos`, `configuracion` preparadas con SQLAlchemy y Alembic.
- [x] Contenedores Docker Compose para PostgreSQL, Redis, FastAPI y Nginx Gateway.

---

### Fase 2: Módulo Apify & Prospección Inteligente B2B
- [ ] Implementación del conector real `ApifyService` en `backend/services/apify_service.py`.
- [ ] Webhooks de recepción de datos de empresas (scraping de LinkedIn y directorios de cámaras de comercio).
- [ ] Pipeline de sanitización y deduplicación de registros en la tabla `empresas`.

---

### Fase 3: Suite IA (Auditor IA & Generador de Diagnósticos)
- [ ] Conexión del SDK oficial `@google/genai` con `GEMINI_API_KEY` en `backend/services/ai_audit_service.py`.
- [ ] Definición de prompts estructurados Pydantic/JSON schema para cálculo del índice de madurez digital.
- [ ] Generación de reportes ejecutivos en PDF mediante WeasyPrint / ReportLab.
- [ ] Generación de activos visuales de apoyo con Gemini Image Generation API.

---

### Fase 4: Canal WhatsApp Business Cloud API & Automatización n8n
- [ ] Integración del webhook oficial de Meta Business API en `backend/api/v1/endpoints/whatsapp.py`.
- [ ] Orquestación de flujos de interacción con n8n y Celery background workers.
- [ ] Agentes conversacionales autónomos con estado de conversación persistido en Redis.

---

### Fase 5: CRM Integrado & Analítica Avanzada
- [ ] Gestión completa de etapas del embudo comercial (Deals, Contactos, Interacciones).
- [ ] Dashboard de analítica en tiempo real conectado via WebSockets / SSE.
- [ ] Sistema distribuido de eventos (Event Bus) para notificaciones push e integración con servicios externos.
