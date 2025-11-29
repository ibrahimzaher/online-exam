import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { UiActions } from './ui.actions';

export const uiFeatureKey = 'ui';

export interface UiState {
  loadingCount: Record<string, number>;
  error: string | null;
}

export const initialUiState: UiState = {
  loadingCount: {},
  error: null,
};

export const uiReducer = createReducer(
  initialUiState,
  on(UiActions.startLoading, (state, { key }) => {
    return {
      ...state,
      loadingCount: {
        ...state.loadingCount,
        [key]: (state.loadingCount[key] || 0) + 1,
      },
    };
  }),
  on(UiActions.stopLoading, (state, { key }) => {
    const count = (state.loadingCount[key] || 1) - 1;
    const loadingCount = { ...state.loadingCount };
    if (count <= 0) {
      delete loadingCount[key];
    } else {
      loadingCount[key] = count;
    }
    return {
      ...state,
      loadingCount,
    };
  }),
  on(UiActions.setError, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(UiActions.clearError, (state) => {
    return {
      ...state,
      error: null,
    };
  })
);

export const uiFeature = createFeature({
  name: uiFeatureKey,
  reducer: uiReducer,
});
export const { name, reducer, selectError, selectUiState } = uiFeature;
export const selectLoading = createSelector(
  selectUiState,
  (state) => Object.keys(state.loadingCount).length > 0
);
export function selectLoadingKey(key: string) {
  return createSelector(selectUiState, (state) => !!state.loadingCount[key]);
}
