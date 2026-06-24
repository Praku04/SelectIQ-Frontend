import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { ResumeService, ATSReport } from '@core/services/resume.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    NavbarComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="container-custom py-8">
        <div class="mb-8 flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Resume History
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              View all your analyzed resumes
            </p>
          </div>
          <button mat-raised-button color="primary" routerLink="/resume/upload">
            <mat-icon>upload</mat-icon>
            New Analysis
          </button>
        </div>

        <mat-card>
          <mat-card-content class="p-0">
            @if (loading()) {
              <app-loading-spinner [message]="'Loading history...'"></app-loading-spinner>
            } @else if (history().length === 0) {
              <app-empty-state
                [icon]="'description'"
                [title]="'No Resume History'"
                [description]="'Upload your first resume to get started with ATS analysis'"
                [actionLabel]="'Upload Resume'"
                (action)="navigateToUpload()">
              </app-empty-state>
            } @else {
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        File Name
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        ATS Score
                      </th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    @for (item of history(); track item.id) {
                      <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <mat-icon class="text-gray-400 mr-3">description</mat-icon>
                            <div>
                              <div class="font-medium text-gray-900 dark:text-white">
                                {{ item.filename }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {{ item.uploadedAt | date:'short' }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <mat-chip 
                            [class.bg-green-100]="item.score >= 80"
                            [class.text-green-800]="item.score >= 80"
                            [class.dark:bg-green-900]="item.score >= 80"
                            [class.dark:text-green-100]="item.score >= 80"
                            [class.bg-yellow-100]="item.score >= 60 && item.score < 80"
                            [class.text-yellow-800]="item.score >= 60 && item.score < 80"
                            [class.dark:bg-yellow-900]="item.score >= 60 && item.score < 80"
                            [class.dark:text-yellow-100]="item.score >= 60 && item.score < 80"
                            [class.bg-red-100]="item.score < 60"
                            [class.text-red-800]="item.score < 60"
                            [class.dark:bg-red-900]="item.score < 60"
                            [class.dark:text-red-100]="item.score < 60">
                            {{ item.score }}%
                          </mat-chip>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <a 
                            mat-icon-button 
                            [routerLink]="['/resume/report', item.id]"
                            matTooltip="View Report">
                            <mat-icon>visibility</mat-icon>
                          </a>
                          <button 
                            mat-icon-button 
                            color="warn"
                            (click)="deleteResume(item.id)"
                            matTooltip="Delete">
                            <mat-icon>delete</mat-icon>
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: []
})
export class HistoryComponent implements OnInit {
  history = signal<ATSReport[]>([]);
  loading = signal(true);

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.resumeService.getResumeHistory().subscribe({
      next: (history) => {
        this.history.set(history);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load history:', error);
        this.loading.set(false);
      }
    });
  }

  deleteResume(id: string): void {
    if (confirm('Are you sure you want to delete this resume analysis?')) {
      this.resumeService.deleteResume(id).subscribe({
        next: () => {
          this.history.update(items => items.filter(item => item.id !== id));
        },
        error: (error) => {
          console.error('Failed to delete resume:', error);
        }
      });
    }
  }

  navigateToUpload(): void {
    // Handled by routerLink in template
  }
}
