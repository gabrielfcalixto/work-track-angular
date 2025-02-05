import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';

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
