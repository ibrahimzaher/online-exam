import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { catchError, EMPTY } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toaster = inject(ToasterService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let message = 'An unexpected error occurred';
      if (err.status === 0 || err instanceof ProgressEvent) {
        message = 'Network error: Please check your connection';
      } else if (err.error?.message) {
        message = err.error.message;
      } else if (err.status >= 500) {
        message = 'Server error: Please try again later';
      } else if (err.status === 401) {
        message = 'Unauthorized: Please login again';
      } else if (err.status === 403) {
        message = 'Forbidden: You do not have access';
      }
      _toaster.show(message, false);
      return EMPTY;
    })
  );
};
