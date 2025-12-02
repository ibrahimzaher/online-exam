import { Routes } from '@angular/router';
import { DiplomasComponent } from './pages/diplomas/diplomas.component';
import { AccountComponent } from './pages/account/account.component';
import { ACCOUNT_ROUTES } from './pages/account/account.routes';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'diploma',
    pathMatch: 'full',
  },
  {
    path: 'diploma',
    component: DiplomasComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
    children: ACCOUNT_ROUTES,
  },
];
