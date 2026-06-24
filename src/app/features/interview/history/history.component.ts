import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { InterviewService, InterviewSession } from '@core/services/interview.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, NavbarComponent, EmptyStateComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <div class="mb-8 flex justify-between">
        <h1 class="text-3xl font-bold">Interview History</h1>
        <button mat-raised-button color="primary" routerLink="/interview">Generate New</button>
      </div>
      @if (sessions().length === 0) {
        <app-empty-state
          icon="quiz"
          title="No Interview Sessions"
          description="Generate interview questions to practice"
          actionLabel="Generate Questions">
        </app-empty-state>
      } @else {
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (session of sessions(); track session.id) {
            <mat-card [routerLink]="['/interview/session', session.id]" class="cursor-pointer hover:shadow-lg">
              <mat-card-content class="p-6">
                <p class="text-2xl font-bold mb-2">{{ session.questions.length }} Questions</p>
                <p class="text-sm text-gray-600">{{ session.createdAt | date:'short' }}</p>
              </mat-card-content>
            </mat-card>
          }
        </div>
      }
    </div>
  `
})
export class HistoryComponent implements OnInit {
  sessions = signal<InterviewSession[]>([]);

  constructor(private interviewService: InterviewService) {}

  ngOnInit(): void {
    this.interviewService.getSessionHistory().subscribe({
      next: (sessions) => this.sessions.set(sessions)
    });
  }
}
