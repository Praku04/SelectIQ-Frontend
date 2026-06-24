import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { InterviewService } from '@core/services/interview.service';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Interview Question Generator</h1>
        <mat-card>
          <mat-card-content class="p-8">
            <form [formGroup]="form" (ngSubmit)="generate()">
              <mat-form-field appearance="outline" class="w-full mb-4">
                <mat-label>Number of Questions</mat-label>
                <mat-select formControlName="count">
                  <mat-option [value]="5">5 questions</mat-option>
                  <mat-option [value]="10">10 questions</mat-option>
                  <mat-option [value]="15">15 questions</mat-option>
                  <mat-option [value]="20">20 questions</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full mb-4">
                <mat-label>Difficulty</mat-label>
                <mat-select formControlName="difficulty">
                  <mat-option value="easy">Easy</mat-option>
                  <mat-option value="medium">Medium</mat-option>
                  <mat-option value="hard">Hard</mat-option>
                  <mat-option value="mixed">Mixed</mat-option>
                </mat-select>
              </mat-form-field>

              <div class="mb-6">
                <label class="block font-medium mb-2">Question Types</label>
                <mat-checkbox formControlName="technical" class="mr-4">Technical</mat-checkbox>
                <mat-checkbox formControlName="behavioral" class="mr-4">Behavioral</mat-checkbox>
                <mat-checkbox formControlName="scenario">Scenario</mat-checkbox>
              </div>

              <button mat-raised-button color="primary" type="submit" [disabled]="loading() || form.invalid" class="w-full">
                {{ loading() ? 'Generating...' : 'Generate Questions' }}
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class InterviewComponent {
  form: FormGroup;
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private interviewService: InterviewService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      count: [10, Validators.required],
      difficulty: ['mixed', Validators.required],
      technical: [true],
      behavioral: [true],
      scenario: [false]
    });
  }

  generate(): void {
    const types: ('technical' | 'behavioral' | 'scenario')[] = [];
    if (this.form.value.technical) types.push('technical');
    if (this.form.value.behavioral) types.push('behavioral');
    if (this.form.value.scenario) types.push('scenario');

    if (types.length === 0) {
      this.snackBar.open('Please select at least one question type', 'Close', { duration: 3000 });
      return;
    }

    this.loading.set(true);
    this.interviewService.generateQuestions({
      questionTypes: types,
      difficulty: this.form.value.difficulty,
      count: this.form.value.count
    }).subscribe({
      next: (session) => {
        this.loading.set(false);
        this.router.navigate(['/interview/session', session.id]);
      },
      error: () => this.loading.set(false)
    });
  }
}
