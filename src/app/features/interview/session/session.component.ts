import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { InterviewService, InterviewSession } from '@core/services/interview.service';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, MatChipsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      @if (session()) {
        <div class="max-w-4xl mx-auto">
          <div class="mb-8 flex justify-between">
            <div>
              <h1 class="text-3xl font-bold">Interview Questions</h1>
              <p class="text-gray-600 dark:text-gray-400">{{ session()!.questions.length }} questions • {{ session()!.createdAt | date:'short' }}</p>
            </div>
            <button mat-raised-button color="primary" (click)="export()">
              <mat-icon>download</mat-icon>
              Export
            </button>
          </div>

          <mat-accordion>
            @for (question of session()!.questions; track question.id; let i = $index) {
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    <div class="flex items-center space-x-3">
                      <span class="font-semibold">Q{{ i + 1 }}</span>
                      <mat-chip [color]="question.type === 'technical' ? 'primary' : question.type === 'behavioral' ? 'accent' : 'warn'">
                        {{ question.type }}
                      </mat-chip>
                      <mat-chip>{{ question.difficulty }}</mat-chip>
                    </div>
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <div class="p-4">
                  <p class="text-lg font-medium mb-4">{{ question.question }}</p>
                  @if (question.sampleAnswer) {
                    <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                      <h4 class="font-semibold mb-2">Sample Answer:</h4>
                      <p class="text-sm">{{ question.sampleAnswer }}</p>
                    </div>
                  }
                  <div>
                    <h4 class="font-semibold mb-2">Tips:</h4>
                    <ul class="list-disc list-inside space-y-1">
                      @for (tip of question.tips; track tip) {
                        <li class="text-sm">{{ tip }}</li>
                      }
                    </ul>
                  </div>
                </div>
              </mat-expansion-panel>
            }
          </mat-accordion>
        </div>
      }
    </div>
  `
})
export class SessionComponent implements OnInit {
  session = signal<InterviewSession | null>(null);

  constructor(
    private route: ActivatedRoute,
    private interviewService: InterviewService
  ) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('id');
    if (sessionId) {
      this.interviewService.getSession(sessionId).subscribe({
        next: (session) => this.session.set(session),
        error: (err) => console.error(err)
      });
    }
  }

  export(): void {
    const sessionId = this.session()?.id;
    if (sessionId) {
      this.interviewService.exportSession(sessionId).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `interview-questions-${sessionId}.pdf`;
          a.click();
        }
      });
    }
  }
}
