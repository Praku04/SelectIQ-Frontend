import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [CommonModule, MatCardModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <h1 class="text-3xl font-bold mb-8">Revenue</h1>
      <mat-card>
        <mat-card-content class="p-8">
          <p>Revenue reports, trends, and financial analytics</p>
          <p class="text-sm text-gray-500 mt-4">TODO: Implement revenue tracking</p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class RevenueComponent {}
