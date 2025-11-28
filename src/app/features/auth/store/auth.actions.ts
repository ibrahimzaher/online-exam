import {
  AuthModel,
  ForgetPasswordReq,
  LoginRequest,
  MessageModel,
  PasswordModel,
  RegisterRequest,
  ResetPasswordReq,
  StatusModel,
  UserModel,
  VerifyResetCodeReq,
} from '@izaher-dev/auth';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
export interface rehydrateModel {
  user: UserModel;
  token: string;
}
export const AuthPageActions = createActionGroup({
  source: 'Auth Page',
  events: {
    loginSubmitted: props<LoginRequest>(),
    registerSubmitted: props<RegisterRequest>(),
    logoutSubmitted: emptyProps(),
    forgetPasswordSubmitted: props<ForgetPasswordReq>(),
    verifyResetCodeSubmitted: props<VerifyResetCodeReq>(),
    resetPasswordSubmitted: props<ResetPasswordReq>(),
    changeStepsSubmitted: props<{ step: number }>(),
  },
});
export const AuthApiActions = createActionGroup({
  source: 'Auth Api',
  events: {
    loginSuccess: props<AuthModel>(),
    loginFailure: props<MessageModel>(),
    registerSuccess: props<AuthModel>(),
    registerFailure: props<MessageModel>(),
    logoutSuccess: props<MessageModel>(),
    logoutFailure: props<MessageModel>(),
    forgetPasswordSuccess: props<{ email: string; message: string }>(),
    forgetPasswordFailure: props<MessageModel>(),
    verifyResetCodeSuccess: props<StatusModel>(),
    verifyResetCodeFailure: props<MessageModel>(),
    resetPasswordSuccess: props<PasswordModel>(),
    resetPasswordFailure: props<MessageModel>(),
    rehydrate: props<rehydrateModel>(),
  },
});
