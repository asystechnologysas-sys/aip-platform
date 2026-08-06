# ASYS Intelligence Platform (AIP) - Architectural Design Document

**Empresa:** ASYS Technology SAS  
**Autor:** Senior Software Architect & Tech Lead  
**Versión:** 1.0.0-architecture-base  

---

## 1. Visión General de Arquitectura

El proyecto **ASYS Intelligence Platform (AIP)** adopta una arquitectura desacoplada, moderna y altamente escalable construida sobre los siguientes pilares de diseño:

1. **Clean Architecture & Domain-Driven Design (DDD):**  
   Desacoplamiento estricto entre la lógica del dominio, los casos de uso (Servicios), los datos (Repositorios) y la infraestructura de entrega (API REST FastAPI / Frontend React 19).

2. **SOLID & DRY Principles:**  
   - *Single Responsibility:* Cada archivo, clase y componente (p. ej., `AuthService`, `UserRepository`, `DataTable`) cumple una única función bien definida.
   - *Open/Closed:* La plataforma está preparada para conectar nuevos proveedores de IA (Gemini, Claude, OpenAI) o canales de comunicación (WhatsApp, Email) sin modificar el código núcleo.
   - *Dependency Inversion:* Las dependencias se inyectan dinámicamente (`Depends(get_db)` en FastAPI y Hooks/Stores en React).

3. **Arquitectura Full-Stack de Alta Concurrencia:**  
   - **Frontend:** React 19 + TypeScript + Vite + TailwindCSS + Zustand + TanStack Query + Framer Motion.
   - **Backend Core:** Python 3.11 + FastAPI + AsyncPG + SQLAlchemy 2.0.
   - **Persistencia & Cache:** PostgreSQL 16 + Redis 7 Distributed Cache & Task Broker.
   - **Gateway & Orquestación:** Traefik / Nginx Reverse Proxy + Docker Compose + EasyPanel.

---

## 2. Diagrama de Capas (Backend & Modular Core)

```
       +-------------------------------------------------------+
       |           Frontend (React 19 SPA / Vite)              |
       +-------------------------------------------------------+
                                   | REST / JSON / JWT
                                   v
       +-------------------------------------------------------+
       |              Gateway Proxy (Nginx / Traefik)          |
       +-------------------------------------------------------+
                                   | Port 8000
                                   v
  +-----------------------------------------------------------------+
  | FastAPI Web Engine (backend/main.py)                             |
  |  +-----------------------------------------------------------+  |
  |  | API Routing Layer (backend/api/v1/endpoints/)              |  |
  |  +-----------------------------------------------------------+  |
  |  | Middlewares (JWT Authentication, Logging, CORS)           |  |
  |  +-----------------------------------------------------------+  |
  |  | Service Layer / Use Cases (backend/services/)              |  |
  |  +-----------------------------------------------------------+  |
  |  | Repository Pattern Layer (backend/repositories/)           |  |
  |  +-----------------------------------------------------------+  |
  |  | Domain Models & Schemas (backend/models/, schemas/)        |  |
  +-----------------------------------------------------------------+
               |                                     |
               v                                     v
+-------------------------------+   +-------------------------------+
|  PostgreSQL 16 (Base de Datos)|   | Redis 7 (Cache & Task Broker) |
+-------------------------------+   +-------------------------------+
                                                     |
                                                     v
                                    +-------------------------------+
                                    | Celery Async Workers (Workers)|
                                    +-------------------------------+
```

---

## 3. Justificación de la Estructura de Carpetas

- `/frontend`: Aplicación cliente React 19 modularizada con vistas atómicas por cada uno de los 18 submódulos solicitados.
- `/backend`: Core en Python FastAPI implementando las capas `api/`, `core/`, `models/`, `schemas/`, `repositories/`, `services/`, `middlewares/`, `events/`, `workers/`.
- `/database`: Script de inicialización idempotente SQL y migraciones controladas con Alembic.
- `/docker`: Orquestación multi-contenedor con `docker-compose.yml`, `nginx.conf` y healthchecks de infraestructura.
- `/docs`: Documentación viva del sistema, diagramas, roadmap técnico y manual de despliegue en VPS / EasyPanel.
- `/scripts`: Automatización de tareas de desarrollo, pruebas y sembrado de base de datos (`seed_db.py`).
- `/logs` & `/storage`: Directorios dedicados a la persistencia aislada de registros de auditoría e imágenes/documentos.
