import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const unAuthGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _storage = inject(StorageService);
  const token = _storage.getItem<string>('token');

  if (token) {
    return _router.parseUrl('/dash');
  }
  return true;
};
