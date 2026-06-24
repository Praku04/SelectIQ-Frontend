import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-reset-password',
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
          <p class="text-gray-600 dark:text-gray-400">Enter your new password</p>
        </div>

        <mat-card>
          <mat-card-content class="p-8">
            <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="w-full mb-4">
                <mat-label>New Password</mat-label>
                <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="password">
                <mat-icon matPrefix>lock</mat-icon>
                <button mat-icon-button matSuffix type="button" (click)="hidePassword.set(!hidePassword())">
                  <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (resetPasswordForm.get('password')?.hasError('required') && resetPasswordForm.get('password')?.touched) {
                  <mat-error>Password is required</mat-error>
                }
                @if (resetPasswordForm.get('password')?.hasError('minlength') && resetPasswordForm.get('password')?.touched) {
                  <mat-error>Password must be at least 8 characters</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full mb-6">
                <mat-label>Confirm Password</mat-label>
                <input matInput [type]="hideConfirmPassword() ? 'password' : 'text'" formControlName="confirmPassword">
                <mat-icon matPrefix>lock</mat-icon>
                <button mat-icon-button matSuffix type="button" (click)="hideConfirmPassword.set(!hideConfirmPassword())">
                  <mat-icon>{{ hideConfirmPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (resetPasswordForm.get('confirmPassword')?.hasError('required') && resetPasswordForm.get('confirmPassword')?.touched) {
                  <mat-error>Please confirm your password</mat-error>
                }
                @if (resetPasswordForm.hasError('passwordMismatch') && resetPasswordForm.get('confirmPassword')?.touched) {
                  <mat-error>Passwords do not match</mat-error>
                }
              </mat-form-field>

              <button 
                mat-raised-button 
                color="primary" 
                type="submit" 
                class="w-full"
                [disabled]="resetPasswordForm.invalid || loading()">
                @if (loading()) {
                  <span>Resetting...</span>
                } @else {
                  <span>Reset Password</span>
                }
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = signal(false);
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || '';
    if (!this.token) {
      this.snackBar.open('Invalid reset token', 'Close', { duration: 5000 });
      this.router.navigate(['/auth/forgot-password']);
    }
  }

  passwordMatchValidator(group: any) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) return;

    this.loading.set(true);
    this.authService.resetPassword(this.token, this.resetPasswordForm.value.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open('Password reset successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.loading.set(false);
        this.snackBar.open(
          error.error?.message || 'Failed to reset password',
          'Close',
          { duration: 5000 }
        );
      }
    });
  }
}
