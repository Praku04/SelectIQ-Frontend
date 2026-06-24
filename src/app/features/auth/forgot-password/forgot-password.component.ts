import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold gradient-text mb-2">SelectIQ</h1>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Reset Password</h2>
          <p class="text-gray-600 dark:text-gray-400">Enter your email to receive a reset link</p>
        </div>

        <mat-card>
          <mat-card-content class="p-8">
            @if (!submitted()) {
              <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
                <mat-form-field appearance="outline" class="w-full mb-4">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" placeholder="you@example.com">
                  <mat-icon matPrefix>email</mat-icon>
                  @if (forgotPasswordForm.get('email')?.hasError('required') && forgotPasswordForm.get('email')?.touched) {
                    <mat-error>Email is required</mat-error>
                  }
                  @if (forgotPasswordForm.get('email')?.hasError('email') && forgotPasswordForm.get('email')?.touched) {
                    <mat-error>Please enter a valid email</mat-error>
                  }
                </mat-form-field>

                <button 
                  mat-raised-button 
                  color="primary" 
                  type="submit" 
                  class="w-full mb-4"
                  [disabled]="forgotPasswordForm.invalid || loading()">
                  @if (loading()) {
                    <span>Sending...</span>
                  } @else {
                    <span>Send Reset Link</span>
                  }
                </button>

                <div class="text-center">
                  <a routerLink="/auth/login" class="text-sm text-primary-600 hover:text-primary-700">
                    Back to Login
                  </a>
                </div>
              </form>
            } @else {
              <div class="text-center py-8">
                <mat-icon class="!w-16 !h-16 !text-6xl text-green-500 mb-4">check_circle</mat-icon>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Check Your Email</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  We've sent a password reset link to your email address.
                </p>
                <a mat-raised-button color="primary" routerLink="/auth/login">
                  Return to Login
                </a>
              </div>
            }
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading = signal(false);
  submitted = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;

    this.loading.set(true);
    this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
      },
      error: (error) => {
        this.loading.set(false);
        this.snackBar.open(
          error.error?.message || 'Failed to send reset link',
          'Close',
          { duration: 5000 }
        );
      }
    });
  }
}
