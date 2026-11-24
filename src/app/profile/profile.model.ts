import { UserRole } from '../auth/auth.service';

export interface Profile {
  id: number;
  name: string;
  email: string;
  login: string;
  role: UserRole;
  joinDate: string;
}
