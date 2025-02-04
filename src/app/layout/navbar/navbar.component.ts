import { ThemeService } from './../../services/theme.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isDarkMode = false;

  constructor(private themeService: ThemeService )
  {
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }

  toggleTheme(): void{
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }

}
