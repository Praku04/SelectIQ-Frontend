import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./analytics/analytics.component').then(m => m.AnalyticsComponent)
  },
  {
    path: 'revenue',
    loadComponent: () => import('./revenue/revenue.component').then(m => m.RevenueComponent)
  },
  {
    path: 'system',
    loadComponent: () => import('./system-health/system-health.component').then(m => m.SystemHealthComponent)
  }
];
