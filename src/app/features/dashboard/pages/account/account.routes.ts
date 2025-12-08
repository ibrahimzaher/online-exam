import { Routes } from '@angular/router';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent),
    data: {
      breadcrumb: 'Account',
    },
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./change-password/change-password.component').then((c) => c.ChangePasswordComponent),
    data: {
      breadcrumb: 'Account',
    },
  },
];
