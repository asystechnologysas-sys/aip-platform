# Registro de Cambios (CHANGELOG)

Todas las modificaciones destacadas de **ASYS Intelligence Platform (AIP)** se documentan en este archivo.

## [v1.2.0] - 2026-08-04

### 🎨 Identidad de Marca
- Incorporado logo oficial de **ASYS Technology S.A.S.** (`AsysLogo.tsx`) con emblema circular, isotipo "A" con halo azul y tipografía corporativa completa.
- Actualizado encabezado del menú lateral y footer institucional.

### 📐 Reorganización de Navegación por Proceso de Negocio
- Reordenados los 14 módulos del menú lateral por procesos comerciales y técnicos:
  - **Procesos de Negocio**: Inicio, Empresas, Prospección, Auditorías IA, Diagnósticos, Campañas.
  - **Interacción & Comercial**: Conversaciones (WhatsApp), IA Conversacional, CRM, Analítica.
  - **Gestión & Documentos**: Documentos, Imágenes IA.
  - **Sistema & Governance**: Configuración, Usuarios, Logs, Estado del Sistema.

### 💼 Expediente Empresarial (Dossier Corporativo)
- Implementado modal de Expediente Empresarial (`EmpresaExpedienteModal.tsx`) con pestañas avanzadas:
  - Información General (NIT, Sector, Empleados, Cámara de Comercio).
  - Ubicación con geolocalización GPS simulada.
  - Web & Tech Stack (CMS, SSL, Analytics).
  - Auditoría IA & Diagnósticos PDF descargables.
  - Conversaciones de WhatsApp Cloud API.
  - Oportunidad en CRM y notas de seguimiento.

### 🤖 Copilot IA Architecture
- Agregado botón flotante (`CopilotButton.tsx`) y panel lateral deslizable (`CopilotDrawer.tsx`) accesible desde cualquier pantalla del sistema.
- Comandos rápidos de ejecución (e.g., "Empresas con mayor potencial", "Filtrar Score > 90", "Estado de la infraestructura").

### 📊 Rediseño del Dashboard Principal
- Nuevo header ejecutivo "¿Cómo va hoy el negocio?" con métricas de salud global y accesos directos.
- Visualización de Embudo Comercial (CRM Funnel) con desglose por etapas y montos en COP.
- Feed de eventos en tiempo real alimentado por `DomainEventBus`.
- Agenda de tareas prioritarias y tabla interactiva de empresas con mayor potencial.

### 🛠️ Arquitectura Event-Driven & Colas
- Creado `DomainEventBus.ts` para desacoplamiento pub-sub de eventos de dominio (`EMPRESA_CREADA`, `AUDITORIA_COMPLETADA`, `DIAGNOSTICO_GENERADO`).
- Creado `TaskQueueManager.ts` para gestión y monitoreo de tareas asíncronas en segundo plano.
