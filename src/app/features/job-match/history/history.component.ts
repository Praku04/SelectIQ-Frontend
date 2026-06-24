import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { JobMatchService, JobMatchResult } from '@core/services/job-match.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, NavbarComponent, EmptyStateComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <div class="mb-8 flex justify-between">
        <h1 class="text-3xl font-bold">Job Match History</h1>
        <button mat-raised-button color="primary" routerLink="/job-match">New Analysis</button>
      </div>
      @if (history().length === 0) {
        <app-empty-state
          icon="work"
          title="No Job Matches Yet"
          description="Start analyzing job matches"
          actionLabel="Analyze Now"
          (action)="$event">
        </app-empty-state>
      } @else {
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (match of history(); track match.id) {
            <mat-card class="hover:shadow-lg cursor-pointer" [routerLink]="['/job-match/result', match.id]">
              <mat-card-content class="p-6">
                <div class="text-4xl font-bold text-primary-600 mb-2">{{ match.matchScore }}%</div>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ match.createdAt | date:'short' }}</p>
              </mat-card-content>
            </mat-card>
          }
        </div>
      }
    </div>
  `
})
export class HistoryComponent implements OnInit {
  history = signal<JobMatchResult[]>([]);

  constructor(private jobMatchService: JobMatchService) {}

  ngOnInit(): void {
    this.jobMatchService.getMatchHistory().subscribe({
      next: (history) => this.history.set(history),
      error: (err) => console.error(err)
    });
  }
}
