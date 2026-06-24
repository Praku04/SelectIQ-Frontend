import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { ResumeService } from '@core/services/resume.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    NavbarComponent,
    FileUploadComponent
  ],
  template: `
    <div class="page-with-navbar">
    <app-navbar></app-navbar>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="container-custom py-8">
        <div class="max-w-3xl mx-auto">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Resume Analysis
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Upload your resume to get instant ATS feedback and optimization suggestions
            </p>
          </div>

          <mat-card class="mb-8">
            <mat-card-content class="p-8">
              <app-file-upload
                #fileUpload
                [title]="'Upload Your Resume'"
                [description]="'Drag and drop your resume here or click to browse'"
                [accept]="'.pdf,.docx,.doc'"
                [maxSizeMB]="10"
                (fileSelected)="onFileSelected($event)">
              </app-file-upload>

              @if (selectedFile()) {
                <div class="mt-6 flex justify-end space-x-3">
                  <button mat-stroked-button (click)="cancel()">
                    Cancel
                  </button>
                  <button 
                    mat-raised-button 
                    color="primary"
                    (click)="uploadResume()"
                    [disabled]="uploading()">
                    @if (uploading()) {
                      <span>Analyzing...</span>
                    } @else {
                      <span>Analyze Resume</span>
                    }
                  </button>
                </div>
              }
            </mat-card-content>
          </mat-card>

          <!-- Info Section -->
          <mat-card>
            <mat-card-header class="p-6 pb-0">
              <mat-card-title>What We Analyze</mat-card-title>
            </mat-card-header>
            <mat-card-content class="p-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="flex items-start space-x-3">
                  <mat-icon class="text-primary-600 dark:text-primary-400">check_circle</mat-icon>
                  <div>
                    <h3 class="font-semibold mb-1">ATS Compatibility</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Check how well your resume passes Applicant Tracking Systems
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <mat-icon class="text-primary-600 dark:text-primary-400">psychology</mat-icon>
                  <div>
                    <h3 class="font-semibold mb-1">Keyword Analysis</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Identify important keywords and missing terms
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <mat-icon class="text-primary-600 dark:text-primary-400">format_align_left</mat-icon>
                  <div>
                    <h3 class="font-semibold mb-1">Format & Structure</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Review formatting and section organization
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <mat-icon class="text-primary-600 dark:text-primary-400">tips_and_updates</mat-icon>
                  <div>
                    <h3 class="font-semibold mb-1">Improvement Tips</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Get actionable suggestions to improve your resume
                    </p>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class UploadComponent {
  @ViewChild('fileUpload') fileUpload!: FileUploadComponent;
  
  selectedFile = signal<File | null>(null);
  uploading = signal(false);

  constructor(
    private resumeService: ResumeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(file: File): void {
    this.selectedFile.set(file);
  }

  uploadResume(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.uploading.set(true);
    this.fileUpload.setUploading(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      this.fileUpload.setProgress(progress);
      if (progress >= 90) {
        clearInterval(interval);
      }
    }, 200);

    this.resumeService.uploadResume(file).subscribe({
      next: (response) => {
        clearInterval(interval);
        this.fileUpload.setProgress(100);
        this.uploading.set(false);
        this.snackBar.open('Resume analyzed successfully!', 'Close', { duration: 3000 });
        
        // Navigate to report
        setTimeout(() => {
          this.router.navigate(['/resume/report', response.reportId]);
        }, 1000);
      },
      error: (error) => {
        clearInterval(interval);
        this.fileUpload.setProgress(100);
        this.uploading.set(false);
        
        // If backend is not available, use mock data
        console.warn('Backend not available, using demo mode:', error);
        this.snackBar.open('Analyzing resume (Demo Mode)...', 'Close', { duration: 2000 });
        
        // Navigate to report with mock ID
        setTimeout(() => {
          this.router.navigate(['/resume/report', 'demo-report-001']);
        }, 1500);
      }
    });
  }

  cancel(): void {
    this.selectedFile.set(null);
    this.fileUpload.removeFile();
  }
}
