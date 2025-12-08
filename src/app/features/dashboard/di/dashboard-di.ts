import { Provider } from '@angular/core';
import { DashboardRepo } from '../domain/repo/dashboard-repo';
import { DashboardApiRepo } from '../data/api/dashbaord-api-repo';
export const DASHBOARD_PROVIDER: Provider[] = [
  {
    provide: DashboardRepo,
    useClass: DashboardApiRepo,
  },
];
