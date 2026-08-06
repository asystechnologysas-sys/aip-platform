-- ASYS Intelligence Platform (AIP) - Initial Schema Seed
-- Base Tables: usuarios, roles, permisos, configuracion

CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permisos (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id VARCHAR(50) REFERENCES roles(id) ON DELETE CASCADE,
    permission_id VARCHAR(50) REFERENCES permisos(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol_id VARCHAR(50) REFERENCES roles(id),
    is_active BOOLEAN DEFAULT TRUE,
    departamento VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS configuracion (
    clave VARCHAR(100) PRIMARY KEY,
    valor JSONB NOT NULL,
    descripcion VARCHAR(255),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Base Roles
INSERT INTO roles (id, nombre, descripcion) VALUES
('role_admin', 'Administrador', 'Acceso total y gestión de infraestructura'),
('role_operator', 'Operador', 'Gestión de prospección, diagnósticos y campañas'),
('role_guest', 'Invitado', 'Acceso de solo lectura para auditorías')
ON CONFLICT (id) DO NOTHING;

-- Seed Base Permissions
INSERT INTO permisos (id, nombre, descripcion) VALUES
('perm_all', 'all:*', 'Superusuario'),
('perm_system_write', 'system:write', 'Configuración del sistema'),
('perm_users_manage', 'users:manage', 'Gestión RBAC de usuarios'),
('perm_audit_exec', 'audit:execute', 'Ejecución de auditorías con IA')
ON CONFLICT (id) DO NOTHING;

-- Seed Admin User
INSERT INTO usuarios (id, nombre, email, password_hash, rol_id, departamento) VALUES
('usr_admin_01', 'Carlos Mendoza', 'admin@asysdigital.com', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', 'role_admin', 'Dirección de Tecnología')
ON CONFLICT (id) DO NOTHING;
