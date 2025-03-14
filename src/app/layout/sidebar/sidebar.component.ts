import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sidebarVisible: boolean = false; // visibilidade do SideNav
  user: any;
  filteredMenuItems: any[] = []; // Itens do menu filtrados

  @Output() onClose: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.getLoggedUser(); // Pega o usuário logado
    console.log('Usuário logado:', this.user);

    // Define os itens do menu com as roles permitidas
    const menuItems = [
      { label: 'Dashboard', link: '/dashboard', icon: 'pi pi-home', roles: ['USER', 'MANAGER', 'ADMIN'] },
      { label: 'Projetos', link: '/projects', icon: 'pi pi-folder', roles: ['MANAGER', 'ADMIN'] },
      { label: 'Tarefas', link: '/tasks', icon: 'pi pi-list', roles: ['MANAGER', 'ADMIN'] },
      { label: 'Lançamento', link: '/time-entry', icon: 'pi pi-clock', roles: ['USER', 'MANAGER', 'ADMIN'] },
      { label: 'Usuários', link: '/users', icon: 'pi pi-users', roles: ['ADMIN'] },
      { label: 'Perfil', link: '/profile', icon: 'pi pi-user', roles: ['USER', 'MANAGER', 'ADMIN'] },
    ];

    // Filtra os itens do menu com base nas roles do usuário
    this.filteredMenuItems = menuItems.filter((item) =>
      this.hasAnyRole(item.roles)
    );
  }

  // Verifica se o usuário tem alguma das roles permitidas
  private hasAnyRole(allowedRoles: string[]): boolean {
    return allowedRoles.includes(this.user.role);
  }

  closeCallback(event: Event): void {
    this.sidebarVisible = false;
    this.onClose.emit(); // evento de fechamento
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible; // alterna visibilidade do SideNav
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
    this.sidebarVisible = false;
  }

  navigateToProfile(event: Event): void {
    event.stopPropagation(); // Impede que o clique afete outros elementos
    this.router.navigate(['/profile']);
    this.sidebarVisible = false;
  }
}
