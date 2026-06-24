import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { AdminService, AdminStats } from '@core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      @if (stats()) {
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <mat-card>
            <mat-card-content class="p-6">
              <div class="flex items-center justify-between mb-4">
                <mat-icon class="text-blue-500">people</mat-icon>
                <span class="text-3xl font-bold">{{ stats()!.totalUsers }}</span>
              </div>
              <p class="text-sm text-gray-600">Total Users</p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-content class="p-6">
              <div class="flex items-center justify-between mb-4">
                <mat-icon class="text-green-500">subscriptions</mat-icon>
                <span class="text-3xl font-bold">{{ stats()!.activeSubscriptions }}</span>
              </div>
              <p class="text-sm text-gray-600">Active Subscriptions</p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-content class="p-6">
              <div class="flex items-center justify-between mb-4">
                <mat-icon class="text-purple-500">attach_money</mat-icon>
                <span class="text-3xl font-bold">\${{ stats()!.totalRevenue.toLocaleString() }}</span>
              </div>
              <p class="text-sm text-gray-600">Total Revenue</p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-content class="p-6">
              <div class="flex items-center justify-between mb-4">
                <mat-icon class="text-orange-500">trending_up</mat-icon>
                <span class="text-3xl font-bold">{{ stats()!.profitMargin }}%</span>
              </div>
              <p class="text-sm text-gray-600">Profit Margin</p>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <mat-card routerLink="/admin/users" class="cursor-pointer hover:shadow-lg">
            <mat-card-content class="p-6 text-center">
              <mat-icon class="!text-6xl mb-4">manage_accounts</mat-icon>
              <h3 class="text-xl font-semibold">User Management</h3>
            </mat-card-content>
          </mat-card>

          <mat-card routerLink="/admin/analytics" class="cursor-pointer hover:shadow-lg">
            <mat-card-content class="p-6 text-center">
              <mat-icon class="!text-6xl mb-4">analytics</mat-icon>
              <h3 class="text-xl font-semibold">Analytics</h3>
            </mat-card-content>
          </mat-card>

          <mat-card routerLink="/admin/system" class="cursor-pointer hover:shadow-lg">
            <mat-card-content class="p-6 text-center">
              <mat-icon class="!text-6xl mb-4">dns</mat-icon>
              <h3 class="text-xl font-semibold">System Health</h3>
            </mat-card-content>
          </mat-card>
        </div>
      }
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  stats = signal<AdminStats | null>(null);

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe({
      next: (stats) => this.stats.set(stats),
      error: (err) => console.error(err)
    });
  }
}
