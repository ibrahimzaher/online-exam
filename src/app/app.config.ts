import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
  provideAppInitializer,
  inject,
} from '@angular/core';
import Aura from '@primeuix/themes/aura';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { AUTH_PROVIDERS, API_CONFIG, UserModel } from '@izaher-dev/auth';
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { uiFeatureKey, uiReducer } from './core/store/ui/ui.reducer';
import { authFeature } from './features/auth/store/auth.reducer';
import { AuthApiActions } from './features/auth/store/auth.actions';
import { StorageService } from './core/services/storage.service';
import { UiEffects } from './core/store/ui/ui.effects';
import { AuthEffects } from './features/auth/store/auth.effects';
export function rehydrate() {
  const store = inject(Store);
  const storage = inject(StorageService);
  const user = storage.getItem<UserModel | null>('user');
  const token = storage.getItem<string | null>('token');

  if (user && token) {
    store.dispatch(AuthApiActions.rehydrate({ user, token }));
  }
}
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
    provideStore({ [uiFeatureKey]: uiReducer, [authFeature.name]: authFeature.reducer }),
    provideEffects(UiEffects, AuthEffects),
    provideAppInitializer(rehydrate),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
