import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Settings</h1>

        <!-- Appearance -->
        <mat-card class="mb-6">
          <mat-card-header class="p-6 pb-0">
            <mat-card-title>Appearance</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="font-medium">Dark Mode</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Toggle between light and dark theme</p>
              </div>
              <mat-slide-toggle
                [checked]="isDarkMode()"
                (change)="toggleTheme()">
              </mat-slide-toggle>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Notifications -->
        <mat-card class="mb-6">
          <mat-card-header class="p-6 pb-0">
            <mat-card-title>Notifications</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Email Notifications</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Receive email updates</p>
                </div>
                <mat-slide-toggle [(ngModel)]="emailNotifications"></mat-slide-toggle>
              </div>
              
              <mat-divider></mat-divider>

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Push Notifications</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Browser notifications for updates</p>
                </div>
                <mat-slide-toggle [(ngModel)]="pushNotifications"></mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- API Keys -->
        <mat-card class="mb-6">
          <mat-card-header class="p-6 pb-0">
            <mat-card-title>API Access</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Generate API keys to access SelectIQ programmatically
            </p>
            <button mat-stroked-button>
              <mat-icon>vpn_key</mat-icon>
              Generate API Key
            </button>
          </mat-card-content>
        </mat-card>

        <!-- Danger Zone -->
        <mat-card class="border-2 border-red-500">
          <mat-card-header class="p-6 pb-0">
            <mat-card-title class="text-red-600 dark:text-red-400">Danger Zone</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <div class="space-y-4">
              <div>
                <p class="font-medium mb-2">Delete Account</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button mat-stroked-button color="warn" (click)="deleteAccount()">
                  <mat-icon>delete_forever</mat-icon>
                  Delete My Account
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class SettingsComponent {
  private themeService = inject(ThemeService);
  
  isDarkMode = this.themeService.isDarkMode;
  emailNotifications = signal(true);
  pushNotifications = signal(false);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion would be processed here');
    }
  }
}
