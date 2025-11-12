import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { tap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _storage = inject(StorageService);
  const token = _storage.getItem<string>('token');
  const authReq = token ? req.clone({ setHeaders: { token: token } }) : req;
  return next(authReq)
};
