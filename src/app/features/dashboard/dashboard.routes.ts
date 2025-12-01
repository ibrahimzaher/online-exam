import { Routes } from '@angular/router';
import { DiplomasComponent } from './pages/diplomas/diplomas.component';
import { AccountComponent } from './pages/account/account.component';

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
  },
];
