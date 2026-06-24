import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { SubscriptionService, Subscription } from '@core/services/subscription.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Subscription Management</h1>

        @if (subscription()) {
          <!-- Current Plan -->
          <mat-card class="mb-8">
            <mat-card-header class="p-6 pb-0">
              <mat-card-title>Current Plan</mat-card-title>
            </mat-card-header>
            <mat-card-content class="p-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h2 class="text-2xl font-bold">{{ subscription()!.plan.name }}</h2>
                  <p class="text-gray-600 dark:text-gray-400">{{ subscription()!.plan.description }}</p>
                </div>
                <mat-chip [color]="subscription()!.status === 'active' ? 'primary' : 'warn'">
                  {{ subscription()!.status }}
                </mat-chip>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Price</p>
                  <p class="text-xl font-semibold">\${{ subscription()!.plan.price }}/{{ subscription()!.plan.interval }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Next Billing Date</p>
                  <p class="text-xl font-semibold">{{ subscription()!.currentPeriodEnd | date }}</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Usage -->
          <mat-card class="mb-8">
            <mat-card-header class="p-6 pb-0">
              <mat-card-title>Usage This Month</mat-card-title>
            </mat-card-header>
            <mat-card-content class="p-6">
              <div class="mb-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium">Credits Used</span>
                  <span class="font-semibold">
                    {{ subscription()!.creditsUsed }} / {{ subscription()!.plan.credits }}
                  </span>
                </div>
                <mat-progress-bar 
                  mode="determinate" 
                  [value]="(subscription()!.creditsUsed / subscription()!.plan.credits) * 100">
                </mat-progress-bar>
              </div>

              <div class="grid md:grid-cols-3 gap-4">
                <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Credits Remaining</p>
                  <p class="text-2xl font-bold">{{ subscription()!.creditsRemaining }}</p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Credits Used</p>
                  <p class="text-2xl font-bold">{{ subscription()!.creditsUsed }}</p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Total Credits</p>
                  <p class="text-2xl font-bold">{{ subscription()!.plan.credits }}</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Actions -->
          <mat-card>
            <mat-card-header class="p-6 pb-0">
              <mat-card-title>Manage Subscription</mat-card-title>
            </mat-card-header>
            <mat-card-content class="p-6">
              <div class="flex flex-wrap gap-4">
                <button mat-raised-button color="primary" routerLink="/pricing">
                  <mat-icon>upgrade</mat-icon>
                  Upgrade Plan
                </button>
                <button mat-stroked-button (click)="manageBilling()">
                  <mat-icon>receipt</mat-icon>
                  Billing History
                </button>
                <button mat-stroked-button color="warn" (click)="cancelSubscription()">
                  <mat-icon>cancel</mat-icon>
                  Cancel Subscription
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        } @else {
          <mat-card>
            <mat-card-content class="p-8 text-center">
              <mat-icon class="!text-6xl text-gray-400 mb-4">subscriptions</mat-icon>
              <h2 class="text-2xl font-bold mb-4">No Active Subscription</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                Choose a plan to get started with SelectIQ
              </p>
              <button mat-raised-button color="primary" routerLink="/pricing">
                View Plans
              </button>
            </mat-card-content>
          </mat-card>
        }
      </div>
    </div>
  `
})
export class SubscriptionComponent implements OnInit {
  subscription = signal<Subscription | null>(null);

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.subscriptionService.getCurrentSubscription().subscribe({
      next: (sub) => this.subscription.set(sub),
      error: () => this.subscription.set(null)
    });
  }

  cancelSubscription(): void {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      this.subscriptionService.cancelSubscription().subscribe({
        next: () => alert('Subscription cancelled'),
        error: (err) => console.error(err)
      });
    }
  }

  manageBilling(): void {
    this.subscriptionService.createPortalSession().subscribe({
      next: (session) => window.location.href = session.url,
      error: (err) => console.error(err)
    });
  }
}
