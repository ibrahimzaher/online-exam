import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Store } from '@ngrx/store';
import { selectIsLogin } from '../../features/auth/store/auth.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const store = inject(Store);

  const isLogin = store.selectSignal(selectIsLogin);

  if (isLogin()) {
    return true;
  } else {
    return _router.parseUrl('/login');
  }
};
