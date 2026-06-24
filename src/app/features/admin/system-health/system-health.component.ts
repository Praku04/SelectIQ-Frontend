import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { AdminService, SystemHealth } from '@core/services/admin.service';

@Component({
  selector: 'app-system-health',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <h1 class="text-3xl font-bold mb-8">System Health</h1>
      @if (health()) {
        <div class="grid md:grid-cols-2 gap-6">
          <mat-card>
            <mat-card-content class="p-6">
              <h3 class="font-semibold mb-4">Status</h3>
              <mat-chip [color]="health()!.status === 'healthy' ? 'primary' : 'warn'">
                {{ health()!.status }}
              </mat-chip>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-content class="p-6">
              <h3 class="font-semibold mb-4">Uptime</h3>
              <p class="text-2xl">{{ health()!.uptime }} hours</p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-content class="p-6">
              <h3 class="font-semibold mb-4">API Latency</h3>
              <p class="text-2xl">{{ health()!.apiLatency }}ms</p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-content class="p-6">
              <h3 class="font-semibold mb-4">Error Rate</h3>
              <p class="text-2xl">{{ health()!.errorRate }}%</p>
            </mat-card-content>
          </mat-card>
        </div>
      }
    </div>
  `
})
export class SystemHealthComponent implements OnInit {
  health = signal<SystemHealth | null>(null);

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getSystemHealth().subscribe({
      next: (health) => this.health.set(health)
    });
  }
}
