import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { AuthService } from '@core/services/auth.service';
import { SubscriptionService } from '@core/services/subscription.service';
import { ResumeService } from '@core/services/resume.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    NavbarComponent,
    LoadingSpinnerComponent,
    SkeletonLoaderComponent,
    EmptyStateComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private subscriptionService = inject(SubscriptionService);
  private resumeService = inject(ResumeService);

  currentUser = this.authService.currentUser;
  loading = signal(true);
  
  stats = signal({
    resumeAnalyses: 0,
    jobMatches: 0,
    interviewSessions: 0,
    careerCoachMessages: 0
  });

  subscription = signal<any>(null);
  recentActivity = signal<any[]>([]);

  quickActions = [
    {
      icon: 'upload_file',
      title: 'Analyze Resume',
      description: 'Get ATS score and feedback',
      route: '/resume/upload',
      color: 'primary'
    },
    {
      icon: 'work',
      title: 'Match Job',
      description: 'Compare resume to job description',
      route: '/job-match',
      color: 'accent'
    },
    {
      icon: 'psychology',
      title: 'Interview Prep',
      description: 'Generate interview questions',
      route: '/interview',
      color: 'warn'
    },
    {
      icon: 'support_agent',
      title: 'Career Coach',
      description: 'Get personalized advice',
      route: '/career-coach',
      color: 'primary'
    }
  ];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading.set(true);

    // Load subscription data
    this.subscriptionService.getCurrentSubscription().subscribe({
      next: (subscription) => {
        this.subscription.set(subscription);
      },
      error: (error) => {
        console.error('Failed to load subscription:', error);
      }
    });

    // Load usage stats
    this.subscriptionService.getUsageStats().subscribe({
      next: (stats) => {
        this.stats.set({
          resumeAnalyses: stats.resumeAnalyses,
          jobMatches: stats.jobMatches,
          interviewSessions: stats.interviewSessions,
          careerCoachMessages: stats.careerCoachMessages
        });
      },
      error: (error) => {
        console.error('Failed to load stats:', error);
      }
    });

    // Load recent activity
    this.resumeService.getResumeHistory().subscribe({
      next: (history) => {
        this.recentActivity.set(history.slice(0, 5));
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load recent activity:', error);
        this.loading.set(false);
      }
    });
  }

  getCreditsPercentage(): number {
    const sub = this.subscription();
    if (!sub || !sub.plan?.credits) return 0;
    return (sub.creditsRemaining / sub.plan.credits) * 100;
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}
