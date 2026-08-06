import React from 'react';
import { Users, UserPlus, ShieldCheck, Key, Lock } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { FilterBar } from '../components/common/FilterBar';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { CardContainer } from '../components/common/Card';
import { MOCK_USERS_LIST } from '../services/mockData';

export const UsuariosPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Administración' }, { label: 'Usuarios & Permisos RBAC' }]} onNavigate={onNavigate} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Gestión de Usuarios y Roles (RBAC)</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Matriz de acceso basada en roles: Administrador, Operador, e Invitado.
          </p>
        </div>
        <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition flex items-center gap-1.5">
          <UserPlus className="w-3.5 h-3.5" />
          <span>Registrar Nuevo Usuario</span>
        </button>
      </div>

      <FilterBar statusOptions={['TODOS', 'Administrador', 'Operador', 'Invitado']} />

      <CardContainer title="Lista General de Usuarios del Sistema">
        <DataTable
          keyField="id"
          data={MOCK_USERS_LIST}
          columns={[
            {
              key: 'name',
              header: 'Usuario',
              render: (u) => (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{u.name}</div>
                    <div className="text-[10px] text-slate-400">{u.email}</div>
                  </div>
                </div>
              ),
            },
            { key: 'department', header: 'Departamento' },
            {
              key: 'role',
              header: 'Rol de Sistema',
              render: (u) => (
                <Badge variant={u.role === 'Administrador' ? 'purple' : u.role === 'Operador' ? 'blue' : 'slate'}>
                  {u.role}
                </Badge>
              ),
            },
            {
              key: 'permissions',
              header: 'Permisos Asignados',
              render: (u) => <span className="font-mono text-[10px] text-slate-400">{u.permissions.join(', ')}</span>,
            },
            {
              key: 'status',
              header: 'Estado',
              render: (u) => <Badge variant={u.status === 'active' ? 'emerald' : 'rose'}>{u.status}</Badge>,
            },
            { key: 'createdAt', header: 'Fecha Alta' },
          ]}
        />
      </CardContainer>
    </div>
  );
};
