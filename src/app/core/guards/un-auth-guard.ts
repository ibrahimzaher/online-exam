import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const unAuthGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _storageService = inject(StorageService);

  const token = _storageService.getItem<string | null>('token');

  if (token) {
    return _router.parseUrl('/diploma');
  }
  return true;
};
