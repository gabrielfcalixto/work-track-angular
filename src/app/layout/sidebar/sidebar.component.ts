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
    { label: 'Atividades', link: '/activity', icon: 'pi pi-list' },
    { label: 'Relatórios', link: '/reports', icon: 'pi pi-chart-bar' },
    { label: 'Usuários', link: '/profile', icon: 'pi pi-users' },
    { label: 'Perfil', link: '/profile', icon: 'pi pi-user' }

  ];


  closeCallback(event: Event): void {
    this.sidebarVisible = false;
    this.onClose.emit(); // evento de fechamento
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible; // alterna visibilidade do SideNav
  }
}
