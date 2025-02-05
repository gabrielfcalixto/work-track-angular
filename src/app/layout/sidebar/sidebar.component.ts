import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',

})
export class SidebarComponent {
  sidebarVisible: boolean = false; // Controla a visibilidade do SideNav

  @Output() onClose: EventEmitter<void> = new EventEmitter(); // Evento para fechar o SideNav

  closeCallback(event: Event): void {
    this.sidebarVisible = false;
    this.onClose.emit(); // Emite o evento de fechamento
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible; // Alterna a visibilidade do SideNav
  }
}
