import { UserRole } from '../auth/auth.service';

export const userRoleLabels: Record<UserRole, string> = {
  ADMIN: 'Administrador',
  MANAGER: 'Gestor',
  USER: 'Colaborador'
};

export interface UserRequest {
  name: string;
  login: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface Users extends Omit<UserRequest, 'password'> {
  id: number;
  joinDate: string;
}
