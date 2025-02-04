import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from './../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isDarkMode = false;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

  @Output() toggleSidebar = new EventEmitter<void>(); // <-- Ajuste aqui

  emitToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
