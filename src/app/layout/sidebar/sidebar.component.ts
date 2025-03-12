import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',

})
export class SidebarComponent {
  sidebarVisible: boolean = false; // visibilidade do SideNav
  user: any;

  @Output() onClose: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router,
    private authService: AuthService
  ) {
    this.user = this.authService.getLoggedUser(); // 👈 pega o usuário logado
    console.log('Usuário logado:', this.user);


  }

  //itens do menu
  menuItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'pi pi-home' },
    { label: 'Projetos', link: '/projects', icon: 'pi pi-folder' },
    { label: 'Tarefas', link: '/tasks', icon: 'pi pi-list' },
    { label: 'Lançamento', link: '/time-entry', icon: 'pi pi-users' },
    { label: 'Usuários', link: '/users', icon: 'pi pi-users' },
    { label: 'Perfil', link: '/profile', icon: 'pi pi-user' }

  ];


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
