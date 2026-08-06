# ASYS Intelligence Platform (AIP) - Manual de Despliegue en EasyPanel / VPS Hostinger

**Sistema Operativo Objetivo:** Ubuntu Server 22.04 / 24.04 LTS  
**Plataforma de Despliegue:** EasyPanel / Docker Compose  

---

## 1. Despliegue Rápido con Docker Compose

En su VPS (Hostinger / Ubuntu Server), ejecute los siguientes comandos para clonar el proyecto e iniciar la pila completa de producción:

```bash
# 1. Clonar el repositorio del proyecto
git clone https://github.com/asys-technology/asys-intelligence-platform.git
cd asys-intelligence-platform

# 2. Copiar archivo de variables de entorno
cp .env.example .env

# 3. Construir e iniciar los servicios con Docker Compose
docker compose -f docker/docker-compose.yml up -d --build

# 4. Verificar el estado de los contenedores
docker compose -f docker/docker-compose.yml ps
```

---

## 2. Despliegue en EasyPanel

EasyPanel es la plataforma recomendada para orquestar la aplicación sin fricción.

1. **Crear Proyecto en EasyPanel:**
   - Ingrese a su panel de administración EasyPanel (e.g., `https://easypanel.midominio.com`).
   - Haga clic en **New Project** y nombre el proyecto: `asys-intelligence-platform`.

2. **Agregar Servicio Backend (FastAPI):**
   - Tipo de Servicio: **App**
   - Fuente: **GitHub Repository** (o Dockerfile)
   - Dockerfile Path: `backend/Dockerfile`
   - Puerto del Contenedor: `8000`
   - Variables de Entorno: Configurar `DATABASE_URL`, `REDIS_HOST`, `SECRET_KEY`, `GEMINI_API_KEY`.

3. **Agregar Servicio Frontend (React 19 / Vite):**
   - Tipo de Servicio: **App**
   - Dockerfile Path: `Dockerfile`
   - Puerto del Contenedor: `3000`

4. **Agregar Bases de Datos Manoseadas por EasyPanel:**
   - **PostgreSQL 16**: Habilitar volumen persistente `/var/lib/postgresql/data`.
   - **Redis 7**: Habilitar servicio Redis.

---

## 3. Verificación de Salud (Healthcheck Endpoints)

- **Frontend Application:** `http://localhost:3000`
- **Backend Health Check:** `http://localhost:8000/api/v1/system/health`
- **Documentación Swagger / OpenAPI:** `http://localhost:8000/docs`
