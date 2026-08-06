# ASYS Intelligence Platform (AIP)

> **ASYS TECHNOLOGY S.A.S.** • AUTOMATIZACIÓN • SOLUCIONES • SISTEMAS INTELIGENTES

Plataforma empresarial SaaS de Inteligencia B2B, Auditoría con Inteligencia Artificial, generación de Diagnósticos Estratégicos, Prospección y CRM Comercial.

---

## 🚀 Módulos Principales

1. **Inicio (Dashboard Executive)**: Visión global de indicadores clave (KPIs), embudo de ventas CRM y feed de eventos de negocio en tiempo real.
2. **Empresas & Expedientes**: Catálogo unificado B2B con dossier corporativo enriquecido (Scraper Apify + Cámara de Comercio).
3. **Prospección**: Extractor de clientes potenciales B2B por NIT, actividad económica y ubicación.
4. **Auditorías IA**: Motor de evaluación de madurez digital impulsado por **Gemini 1.5 Pro**.
5. **Diagnósticos PDF**: Compilador de informes ejecutivos descargables en PDF.
6. **Campañas**: Gestor de secuencias de prospección y alcance masivo.
7. **Conversaciones (WhatsApp Cloud API)**: Interacción directa omnicanal y agentes conversacionales.
8. **IA Conversacional**: Asistente virtual y bots de soporte automatizados.
9. **CRM**: Pipeline comercial con control de etapas, montos y probabilidades de cierre.
10. **Analítica**: Tableros de rendimiento operativo y comercial.
11. **Documentos & Imágenes**: Repositorio de activos digitales.
12. **Configuración & Usuarios**: Governance, RBAC y variables de entorno.
13. **Logs & Auditoría**: Registro centralizado de transacciones del sistema.
14. **Estado del Sistema**: Monitor de salud (Healthcheck) de microservicios, PostgreSQL, Redis, Docker y APIs externas.

---

## 🛠️ Arquitectura Técnica

- **Frontend**: React 19, TypeScript, TailwindCSS v4, Zustand State Management, Lucide Icons.
- **Backend Core**: FastAPI (Python 3.12 / Async SQLAlchemy / Pydantic v2).
- **Event Bus**: `DomainEventBus` desacoplado para patrones EDA (Event-Driven Architecture).
- **Queue Engine**: `TaskQueueManager` para monitoreo de tareas en segundo plano (Celery + Redis).
- **Copilot IA**: Asistente contextual con comandos rápidos y procesamiento de lenguaje natural.

---

## ⚡ Ejecución en Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

*Desarrollado por ASYS Technology S.A.S. © 2026*
