import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeLinkId = 'theme-link';
  private darkTheme = 'assets/themes/lara-dark-teal/theme.css';
  private lightTheme = 'assets/themes/lara-light-teal/theme.css';
  private darkModeKey = 'dark-mode';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem(this.darkModeKey, JSON.stringify(isDarkMode));
    this.setTheme(isDarkMode ? this.darkTheme : this.lightTheme);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.darkModeKey);
    const isDarkMode = savedTheme === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
    this.setTheme(isDarkMode ? this.darkTheme : this.lightTheme);
  }
  getTheme(): string {
    // Verifica se o body possui a classe 'dark-mode'
    return document.body.classList.contains('dark-mode') ? 'lara-dark' : 'lara-light';
  }


  private setTheme(themePath: string): void {
    let themeLink = document.getElementById(this.themeLinkId) as HTMLLinkElement;

    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.id = this.themeLinkId;
      themeLink.rel = 'stylesheet';
      document.head.appendChild(themeLink);
    }

    themeLink.href = themePath;
  }
}
