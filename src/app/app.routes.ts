import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { adminGuard } from '@core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'resume',
    canActivate: [authGuard],
    loadChildren: () => import('./features/resume/resume.routes').then(m => m.RESUME_ROUTES)
  },
  {
    path: 'job-match',
    canActivate: [authGuard],
    loadChildren: () => import('./features/job-match/job-match.routes').then(m => m.JOB_MATCH_ROUTES)
  },
  {
    path: 'interview',
    canActivate: [authGuard],
    loadChildren: () => import('./features/interview/interview.routes').then(m => m.INTERVIEW_ROUTES)
  },
  {
    path: 'career-coach',
    canActivate: [authGuard],
    loadComponent: () => import('./features/career-coach/career-coach.component').then(m => m.CareerCoachComponent)
  },
  {
    path: 'skill-gap',
    canActivate: [authGuard],
    loadComponent: () => import('./features/skill-gap/skill-gap.component').then(m => m.SkillGapComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent)
  },
  {
    path: 'subscription',
    canActivate: [authGuard],
    loadComponent: () => import('./features/subscription/subscription.component').then(m => m.SubscriptionComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
