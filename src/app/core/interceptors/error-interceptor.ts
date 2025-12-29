import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { UiActions } from '../store/ui/ui.actions';
import { AuthApiActions } from '../../features/auth/store/auth.actions';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
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
      if (err.error?.message?.includes('jwt') || err.error?.message?.includes('token')) {
        message = 'Your session has expired. Please log in again.';
        store.dispatch(AuthApiActions.logoutSuccess({ message }));
      } else {
        store.dispatch(UiActions.setError({ error: message }));
      }
      return throwError(() => ({ message, status: err.status }));
    })
  );
};
