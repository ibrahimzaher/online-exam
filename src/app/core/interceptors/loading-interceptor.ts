import { inject } from '@angular/core';
import { LoadingService } from './../services/loading.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _loadingService = inject(LoadingService);
  _loadingService.show();

  return next(req).pipe(
    finalize(() => _loadingService.hide())
  );
};
