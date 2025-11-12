import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';
import { authGuard } from './core/guards/auth-guard';
import { unAuthGuard } from './core/guards/un-auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: AUTH_ROUTES,
    canActivate: [unAuthGuard]
  },
  {
    path: 'dash',
    component: DashboardLayoutComponent,
    canActivate: [authGuard]
  }
];
