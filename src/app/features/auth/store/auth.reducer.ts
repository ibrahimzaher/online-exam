import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { AuthApiActions, AuthPageActions } from './auth.actions';
import { UserModel } from '@izaher-dev/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: UserModel | null;
  token: string | null;
  forgetPasswordFlow: {
    steps: number;
    email: string | null;
  };
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  forgetPasswordFlow: {
    steps: 1,
    email: null,
  },
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthApiActions.loginSuccess, AuthApiActions.registerSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
  })),

  on(AuthApiActions.logoutSuccess, AuthApiActions.registerFailure, (state) => ({
    ...state,
    user: null,
    token: null,
  })),
  on(AuthApiActions.forgetPasswordSuccess, (state, { email, message }) => ({
    ...state,
    forgetPasswordFlow: {
      email: email,
      steps: 2,
    },
  })),
  on(AuthApiActions.verifyResetCodeSuccess, (state) => ({
    ...state,
    forgetPasswordFlow: {
      email: state.forgetPasswordFlow.email,
      steps: 3,
    },
  })),
  on(AuthApiActions.resetPasswordSuccess, (state) => ({
    ...state,
    forgetPasswordFlow: {
      email: '',
      steps: 1,
    },
  })),
  on(AuthPageActions.changeStepsSubmitted, (state, { step }) => {
    return {
      ...state,
      forgetPasswordFlow: {
        ...state.forgetPasswordFlow,
        steps: step,
      },
    };
  }),

  on(AuthApiActions.rehydrate, (state, { user, token }) => ({
    ...state,
    user,
    token,
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: authReducer,
});
export const { name, reducer, selectAuthState, selectForgetPasswordFlow, selectToken, selectUser } =
  authFeature;
export const selectIsLogin = createSelector(
  selectUser,
  selectToken,
  (user, token) => !!user && !!token
);
export const selectForgetFlowSteps = createSelector(selectForgetPasswordFlow, (flow) => flow.steps);
export const selectForgetFlowEmail = createSelector(selectForgetPasswordFlow, (flow) => flow.email);
