import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { ResumeService, ATSReport } from '@core/services/resume.service';
import { JobMatchService } from '@core/services/job-match.service';

@Component({
  selector: 'app-job-match',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    NavbarComponent
  ],
  templateUrl: './job-match.component.html',
  styleUrls: ['./job-match.component.scss']
})
export class JobMatchComponent implements OnInit {
  matchForm: FormGroup;
  resumes = signal<ATSReport[]>([]);
  loading = signal(false);
  loadingResumes = signal(true);

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private jobMatchService: JobMatchService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.matchForm = this.fb.group({
      resumeId: ['', Validators.required],
      jobDescription: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.resumeService.getResumeHistory().subscribe({
      next: (resumes) => {
        this.resumes.set(resumes);
        this.loadingResumes.set(false);
      },
      error: (error) => {
        console.error('Failed to load resumes:', error);
        this.loadingResumes.set(false);
      }
    });
  }

  analyzeMatch(): void {
    if (this.matchForm.invalid) return;

    this.loading.set(true);
    this.jobMatchService.analyzeJobMatch(this.matchForm.value).subscribe({
      next: (result) => {
        this.loading.set(false);
        this.snackBar.open('Job match analysis complete!', 'Close', { duration: 3000 });
        this.router.navigate(['/job-match/result', result.id]);
      },
      error: (error) => {
        this.loading.set(false);
        this.snackBar.open(
          error.error?.message || 'Failed to analyze job match',
          'Close',
          { duration: 5000 }
        );
      }
    });
  }
}
