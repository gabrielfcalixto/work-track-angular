import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',

})
export class SidebarComponent {
  sidebarVisible: boolean = false; // Controla a visibilidade do SideNav

  @Output() onClose: EventEmitter<void> = new EventEmitter(); // Evento para fechar o SideNav

  // Adicionando os itens do menu
  menuItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'pi pi-home' },
    { label: 'Projetos', link: '/projects', icon: 'pi pi-folder' },
    { label: 'Relatórios', link: '/reports', icon: 'pi pi-chart-bar' },
    { label: 'Perfil', link: '/profile', icon: 'pi pi-user' }
  ];

  closeCallback(event: Event): void {
    this.sidebarVisible = false;
    this.onClose.emit(); // Emite o evento de fechamento
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible; // Alterna a visibilidade do SideNav
  }
}
