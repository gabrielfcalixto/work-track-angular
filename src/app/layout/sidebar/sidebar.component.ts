import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',

})
export class SidebarComponent {
  sidebarVisible: boolean = false; // visibilidade do SideNav

  @Output() onClose: EventEmitter<void> = new EventEmitter(); // fechar o SideNav
  constructor(private router: Router) {}

  //itens do menu
  menuItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'pi pi-home' },
    { label: 'Projetos', link: '/projects', icon: 'pi pi-folder' },
    { label: 'Tarefas', link: '/tasks', icon: 'pi pi-list' },
    // { label: 'Relatórios', link: '/reports', icon: 'pi pi-chart-bar' },
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
    this.sidebarVisible = false; // Fecha a sidebar após a navegação
  }


}
