import { Routes } from '@angular/router';
import { AccountComponent } from '../settings/pages/account/account.component';

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
    title: 'Diplomas',
  },

  {
    path: 'exams/:id',
    loadComponent: () => import('./pages/exams/exams.component').then((c) => c.ExamsComponent),
    data: {
      breadcrumb: 'Exams',
    },
    title: 'Exams',
  },

  {
    path: 'questions/:examId',
    loadComponent: () =>
      import('../dashboard/pages/exams/questions/questions.component').then(
        (c) => c.QuestionsComponent
      ),

    data: {
      breadcrumb: 'Questions',
    },
    title: 'Questions',
  },

  {
    path: 'account',
    component: AccountComponent,
    loadChildren: () =>
      import('../settings/pages/account/account.routes').then((m) => m.ACCOUNT_ROUTES),
  },
];
