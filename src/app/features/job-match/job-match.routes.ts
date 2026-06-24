import { Routes } from '@angular/router';

export const JOB_MATCH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./job-match.component').then(m => m.JobMatchComponent)
  },
  {
    path: 'result/:id',
    loadComponent: () => import('./result/result.component').then(m => m.ResultComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.component').then(m => m.HistoryComponent)
  }
];
