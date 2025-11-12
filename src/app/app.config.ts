import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import Aura from '@primeuix/themes/aura';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { AUTH_PROVIDERS, API_CONFIG } from '@izaher-dev/auth'
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor, tokenInterceptor, errorInterceptor])),
    provideRouter(routes, withHashLocation(), withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    })),
    provideAnimationsAsync(),
    MessageService,
    ...AUTH_PROVIDERS,
    { provide: API_CONFIG, useValue: { baseUrl: environment.baseUrl } },
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
  ],
};
