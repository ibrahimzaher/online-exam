import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _storage = inject(StorageService);
  const token = _storage.getItem<string>('token');
  const authReq = token ? req.clone({ setHeaders: { token: token } }) : req;
  const router = inject(Router);
  return next(authReq).pipe(
    catchError((err) => {
      if (err.status == 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
