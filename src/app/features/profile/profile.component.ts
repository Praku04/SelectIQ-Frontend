import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="container-custom py-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Profile</h1>

        <!-- Avatar Section -->
        <mat-card class="mb-8">
          <mat-card-content class="p-8 text-center">
            <div class="w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
              <span class="text-5xl font-bold text-primary-700 dark:text-primary-300">
                {{ currentUser()?.name ? currentUser()!.name!.charAt(0).toUpperCase() : 'U' }}
              </span>
            </div>
            <button mat-stroked-button>
              <mat-icon>upload</mat-icon>
              Change Avatar
            </button>
          </mat-card-content>
        </mat-card>

        <!-- Profile Form -->
        <mat-card class="mb-8">
          <mat-card-header class="p-6 pb-0">
            <mat-card-title>Personal Information</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <form [formGroup]="profileForm" (ngSubmit)="updateProfile()">
              <mat-form-field appearance="outline" class="w-full mb-4">
                <mat-label>Full Name</mat-label>
                <input matInput formControlName="name">
                <mat-icon matPrefix>person</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full mb-4">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email">
                <mat-icon matPrefix>email</mat-icon>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" [disabled]="loading()">
                {{ loading() ? 'Saving...' : 'Save Changes' }}
              </button>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Change Password -->
        <mat-card>
          <mat-card-header class="p-6 pb-0">
            <mat-card-title>Change Password</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <form [formGroup]="passwordForm" (ngSubmit)="changePassword()">
              <mat-form-field appearance="outline" class="w-full mb-4">
                <mat-label>Current Password</mat-label>
                <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="currentPassword">
                <mat-icon matPrefix>lock</mat-icon>
                <button mat-icon-button matSuffix type="button" (click)="hidePassword.set(!hidePassword())">
                  <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full mb-4">
                <mat-label>New Password</mat-label>
                <input matInput [type]="hideNewPassword() ? 'password' : 'text'" formControlName="newPassword">
                <mat-icon matPrefix>lock</mat-icon>
                <button mat-icon-button matSuffix type="button" (click)="hideNewPassword.set(!hideNewPassword())">
                  <mat-icon>{{ hideNewPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" [disabled]="loadingPassword()">
                {{ loadingPassword() ? 'Updating...' : 'Update Password' }}
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  currentUser = this.authService.currentUser;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  loading = signal(false);
  loadingPassword = signal(false);
  hidePassword = signal(true);
  hideNewPassword = signal(true);

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    const user = this.currentUser();
    if (user) {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email
      });
    }
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;
    this.loading.set(true);
    
    // Simulate API call
    setTimeout(() => {
      this.loading.set(false);
      this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
    }, 1000);
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;
    this.loadingPassword.set(true);
    
    // Simulate API call
    setTimeout(() => {
      this.loadingPassword.set(false);
      this.passwordForm.reset();
      this.snackBar.open('Password updated successfully!', 'Close', { duration: 3000 });
    }, 1000);
  }
}
