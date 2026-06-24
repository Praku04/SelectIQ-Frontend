import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { JobMatchService, JobMatchResult } from '@core/services/job-match.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    NavbarComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="container-custom py-8">
        @if (loading()) {
          <app-loading-spinner [message]="'Analyzing match...'"></app-loading-spinner>
        } @else if (result()) {
          <div class="max-w-5xl mx-auto">
            <div class="mb-8 flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Match Results</h1>
                <p class="text-gray-600 dark:text-gray-400">{{ result()!.createdAt | date:'medium' }}</p>
              </div>
              <button mat-raised-button color="primary" routerLink="/job-match">
                <mat-icon>add</mat-icon>
                New Analysis
              </button>
            </div>

            <!-- Match Score -->
            <mat-card class="mb-8">
              <mat-card-content class="p-8 text-center">
                <h2 class="text-2xl font-bold mb-4">Job Match Score</h2>
                <div class="inline-flex items-center justify-center w-40 h-40 rounded-full mb-4"
                     [class.bg-green-100]="result()!.matchScore >= 80"
                     [class.bg-yellow-100]="result()!.matchScore >= 60 && result()!.matchScore < 80"
                     [class.bg-red-100]="result()!.matchScore < 60">
                  <span class="text-6xl font-bold"
                        [class.text-green-600]="result()!.matchScore >= 80"
                        [class.text-yellow-600]="result()!.matchScore >= 60 && result()!.matchScore < 80"
                        [class.text-red-600]="result()!.matchScore < 60">
                    {{ result()!.matchScore }}%
                  </span>
                </div>
                <mat-progress-bar mode="determinate" [value]="result()!.matchScore"></mat-progress-bar>
              </mat-card-content>
            </mat-card>

            <!-- Skills -->
            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <mat-card>
                <mat-card-header class="p-6 pb-0">
                  <mat-card-title class="flex items-center">
                    <mat-icon class="text-green-500 mr-2">check_circle</mat-icon>
                    Matched Skills
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content class="p-6">
                  <div class="flex flex-wrap gap-2">
                    @for (skill of result()!.matchedSkills; track skill) {
                      <mat-chip class="bg-green-100 text-green-800">{{ skill }}</mat-chip>
                    }
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header class="p-6 pb-0">
                  <mat-card-title class="flex items-center">
                    <mat-icon class="text-red-500 mr-2">cancel</mat-icon>
                    Missing Skills
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content class="p-6">
                  <div class="flex flex-wrap gap-2">
                    @for (skill of result()!.missingSkills; track skill) {
                      <mat-chip class="bg-red-100 text-red-800">{{ skill }}</mat-chip>
                    }
                  </div>
                </mat-card-content>
              </mat-card>
            </div>

            <!-- Recommendations -->
            <mat-card>
              <mat-card-header class="p-6 pb-0">
                <mat-card-title>Recommendations</mat-card-title>
              </mat-card-header>
              <mat-card-content class="p-6">
                @for (rec of result()!.recommendations; track rec.category) {
                  <div class="mb-6">
                    <h3 class="font-semibold text-lg mb-3">{{ rec.category }}</h3>
                    <ul class="space-y-2">
                      @for (item of rec.items; track item) {
                        <li class="flex items-start">
                          <mat-icon class="text-blue-500 mr-2">arrow_right</mat-icon>
                          <span>{{ item }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ResultComponent implements OnInit {
  result = signal<JobMatchResult | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private jobMatchService: JobMatchService
  ) {}

  ngOnInit(): void {
    const matchId = this.route.snapshot.paramMap.get('id');
    if (matchId) {
      this.jobMatchService.getMatchById(matchId).subscribe({
        next: (result) => {
          this.result.set(result);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    }
  }
}
