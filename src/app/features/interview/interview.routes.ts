import { Routes } from '@angular/router';

export const INTERVIEW_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./interview.component').then(m => m.InterviewComponent)
  },
  {
    path: 'session/:id',
    loadComponent: () => import('./session/session.component').then(m => m.SessionComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.component').then(m => m.HistoryComponent)
  }
];
