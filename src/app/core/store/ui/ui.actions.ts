import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'Ui',
  events: {
    startLoading: props<{ key: string }>(),
    stopLoading: props<{ key: string }>(),
    setError: props<{ error: string }>(),
    clearError: emptyProps(),
  },
});
