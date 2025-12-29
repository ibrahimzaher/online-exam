import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { API_CONFIG, AUTH_PROVIDERS } from '@izaher-dev/auth';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { environment } from '../environments/environment';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { UiEffects } from './core/store/ui/ui.effects';
import { uiFeatureKey, uiReducer } from './core/store/ui/ui.reducer';
import { AuthEffects } from './features/auth/store/auth.effects';
import { authFeature } from './features/auth/store/auth.reducer';
import { DASHBOARD_PROVIDER } from './features/dashboard/di/dashboard-di';
import { DashboardEffects } from './features/dashboard/store/dashboard/dashboard.effects';
import { dashboardFeature } from './features/dashboard/store/dashboard/dashboard.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor, tokenInterceptor, errorInterceptor])
    ),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideAnimationsAsync(),
    MessageService,
    ...AUTH_PROVIDERS,
    { provide: API_CONFIG, useValue: { baseUrl: environment.baseUrl } },
    ...DASHBOARD_PROVIDER,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideStore({
      [uiFeatureKey]: uiReducer,
      [authFeature.name]: authFeature.reducer,
      [dashboardFeature.name]: dashboardFeature.reducer,
    }),
    provideEffects(UiEffects, AuthEffects, DashboardEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
