import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'diploma',
    pathMatch: 'full',
  },

  {
    path: 'diploma',
    loadComponent: () =>
      import('./pages/diplomas/diplomas.component').then((c) => c.DiplomasComponent),
  },

  {
    path: 'exams/:id',
    loadComponent: () => import('./pages/exams/exams.component').then((c) => c.ExamsComponent),
    data: {
      breadcrumb: 'Exams',
    },
  },

  {
    path: 'questions/:examId',
    loadComponent: () =>
      import('./pages/questions/questions.component').then((c) => c.QuestionsComponent),

    data: {
      breadcrumb: 'Questions',
    },
  },

  {
    path: 'account',
    loadComponent: () =>
      import('./pages/account/account.component').then((c) => c.AccountComponent),

    loadChildren: () => import('./pages/account/account.routes').then((m) => m.ACCOUNT_ROUTES),
  },
];
