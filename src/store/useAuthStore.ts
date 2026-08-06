import { create } from 'zustand';
import { User, Role } from '../types';

interface AuthStore {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: Role) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: Role) => void;
  checkAuth: () => void;
}

const DEFAULT_USERS: Record<Role, User> = {
  Administrador: {
    id: 'usr_01_admin',
    name: 'Carlos Mendoza',
    email: 'admin@asysdigital.com',
    role: 'Administrador',
    department: 'Dirección de Tecnología',
    permissions: ['all:*', 'system:write', 'users:manage', 'audit:execute', 'campaigns:manage'],
    status: 'active',
    createdAt: '2025-01-15T08:00:00Z',
  },
  Operador: {
    id: 'usr_02_operator',
    name: 'Valeria Ríos',
    email: 'operador@asysdigital.com',
    role: 'Operador',
    department: 'Estrategia Comercial',
    permissions: ['prospects:read', 'prospects:write', 'campaigns:read', 'audit:view'],
    status: 'active',
    createdAt: '2025-02-01T10:30:00Z',
  },
  Invitado: {
    id: 'usr_03_guest',
    name: 'Invitado Auditor',
    email: 'guest@asysdigital.com',
    role: 'Invitado',
    department: 'Consultoría Externa',
    permissions: ['read:only'],
    status: 'active',
    createdAt: '2025-03-10T14:20:00Z',
  },
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: DEFAULT_USERS['Administrador'], // Default logged in as Admin for instant dashboard exploration
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfMDFfYWRtaW4iLCJyb2xlIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTczODY3MjAwMH0.mock_signature',
  refreshToken: 'ref_tok_99481204812_asys',
  isAuthenticated: true,
  isLoading: false,

  login: async (email: string, role: Role = 'Administrador') => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate async network call
    const selectedUser = DEFAULT_USERS[role] || {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      permissions: role === 'Administrador' ? ['all:*'] : ['read:standard'],
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    set({
      user: selectedUser,
      token: `jwt_token_${Date.now()}_${role}`,
      refreshToken: `refresh_token_${Date.now()}`,
      isAuthenticated: true,
      isLoading: false,
    });
    return true;
  },

  logout: () => {
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  switchRole: (newRole: Role) => {
    const newUser = DEFAULT_USERS[newRole];
    set({
      user: newUser,
      token: `jwt_token_${Date.now()}_${newRole}`,
    });
  },

  checkAuth: () => {
    // Session persistence check
    const currentToken = get().token;
    if (currentToken && !get().user) {
      set({ user: DEFAULT_USERS['Administrador'], isAuthenticated: true });
    }
  },
}));
