import { Injectable, signal, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  isDarkMode$ = this.darkModeSubject.asObservable();
  isDarkMode = signal(this.getInitialTheme());

  constructor() {
    effect(() => {
      this.applyTheme(this.isDarkMode());
    });
  }

  private getInitialTheme(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    this.darkModeSubject.next(newTheme);
    this.saveTheme(newTheme);
  }

  setTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this.darkModeSubject.next(isDark);
    this.saveTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }

  private saveTheme(isDark: boolean): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }
}
