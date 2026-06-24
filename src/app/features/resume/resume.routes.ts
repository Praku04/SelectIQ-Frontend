import { Routes } from '@angular/router';

export const RESUME_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'upload',
    pathMatch: 'full'
  },
  {
    path: 'upload',
    loadComponent: () => import('./upload/upload.component').then(m => m.UploadComponent)
  },
  {
    path: 'report/:id',
    loadComponent: () => import('./report/report.component').then(m => m.ReportComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.component').then(m => m.HistoryComponent)
  }
];
