import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToasterService } from '../../services/toaster.service';
import { UiActions } from './ui.actions';
import { finalize, map, tap } from 'rxjs';

@Injectable()
export class UiEffects {
  private readonly actions$ = inject(Actions);
  private readonly toaster = inject(ToasterService);
  error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UiActions.setError),
      tap(({ error }) => {
        this.toaster.show(error, false);
      }),
      map(() => UiActions.clearError())
    )
  );
}
