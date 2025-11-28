import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { UiActions } from '../store/ui/ui.actions';
import { interceptorLoading } from '../store/ui/ui.constant';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  store.dispatch(UiActions.startLoading({ key: interceptorLoading }));
  return next(req).pipe(
    finalize(() => store.dispatch(UiActions.stopLoading({ key: interceptorLoading })))
  );
};
