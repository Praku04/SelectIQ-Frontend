import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { ResumeService, ATSReport } from '@core/services/resume.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatExpansionModule,
    NavbarComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  report = signal<ATSReport | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    const reportId = this.route.snapshot.paramMap.get('id');
    if (reportId) {
      this.loadReport(reportId);
    }
  }

  loadReport(reportId: string): void {
    this.loading.set(true);
    this.resumeService.getATSReport(reportId).subscribe({
      next: (report) => {
        console.log('Report loaded successfully:', report);
        this.report.set(report);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load report:', error);
        this.loading.set(false);
        // Even if there's an error, the catchError in service should have handled it
        // This error handler should rarely be reached
      }
    });
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  }

  getScoreBgColor(score: number): string {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  }

  downloadReport(): void {
    const reportId = this.report()?.id;
    if (!reportId) return;

    this.resumeService.downloadReport(reportId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ats-report-${reportId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Failed to download report:', error);
      }
    });
  }
}
