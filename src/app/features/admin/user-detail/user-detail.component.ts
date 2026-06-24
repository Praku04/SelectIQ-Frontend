import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { AdminService, UserManagement } from '@core/services/admin.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      @if (user()) {
        <h1 class="text-3xl font-bold mb-8">{{ user()!.name }}</h1>
        <mat-card>
          <mat-card-content class="p-6">
            <p><strong>Email:</strong> {{ user()!.email }}</p>
            <p><strong>Role:</strong> {{ user()!.role }}</p>
            <p><strong>Created:</strong> {{ user()!.createdAt | date }}</p>
            <p><strong>Last Login:</strong> {{ user()!.lastLogin | date }}</p>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `
})
export class UserDetailComponent implements OnInit {
  user = signal<UserManagement | null>(null);

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.adminService.getUser(userId).subscribe({
        next: (user) => this.user.set(user)
      });
    }
  }
}
