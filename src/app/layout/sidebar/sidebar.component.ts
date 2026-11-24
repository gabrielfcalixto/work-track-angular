import { Component } from '@angular/core';
import { AuthService, UserRole } from '../../auth/auth.service';

const management: UserRole[] = ['MANAGER', 'ADMIN'];
const menu = [
  { label: 'Visão geral', link: '/dashboard', icon: 'pi-home' },
  { label: 'Clientes', link: '/clients', icon: 'pi-building', roles: management },
  { label: 'Projetos', link: '/projects', icon: 'pi-folder', roles: management },
  { label: 'Tarefas', link: '/tasks', icon: 'pi-list', roles: management },
  { label: 'Lançamentos', link: '/time-entry', icon: 'pi-clock' },
  { label: 'Usuários', link: '/users', icon: 'pi-users', roles: ['ADMIN'] },
  { label: 'Perfil', link: '/profile', icon: 'pi-user' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  readonly items = menu.filter(item => !item.roles || item.roles.some(role => role === this.auth.getUserRole()));
  visible = false;

  constructor(private readonly auth: AuthService) {}
}
