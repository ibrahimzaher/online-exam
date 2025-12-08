import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { unAuthGuard } from './core/guards/un-auth-guard';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';
export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate: [unAuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
