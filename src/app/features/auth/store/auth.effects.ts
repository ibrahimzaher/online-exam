import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  ChangePasswordUsecaseService,
  DeleteMeUsecaseService,
  EditProfileUsecaseService,
  ForgetPasswordUsecaseService,
  LoginUsecaseService,
  LogoutUsecaseService,
  RegisterUsecaseService,
  ResetPasswordUsecaseService,
  VerifyResetCodeUsecaseService,
} from '@izaher-dev/auth';
import { StorageService } from '../../../core/services/storage.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { AuthApiActions, AuthPageActions } from './auth.actions';
import { catchError, exhaustMap, finalize, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UiActions } from '../../../core/store/ui/ui.actions';
import {
  buttonForgetLoading,
  buttonLoginLoading,
  buttonLogoutLoading,
  buttonRegisterLoading,
  buttonResetLoading,
  buttonVerifyLoading,
  changePasswordLoading,
  deleteAccountLoading,
  editProfileLoading,
} from '../../../core/store/ui/ui.constant';
import { uiFeature } from '../../../core/store/ui/ui.reducer';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly loginUsecaseService = inject(LoginUsecaseService);
  private readonly registerUsecaseService = inject(RegisterUsecaseService);
  private readonly forgetPasswordUsecaseService = inject(ForgetPasswordUsecaseService);
  private readonly verifyResetCodeUsecaseService = inject(VerifyResetCodeUsecaseService);
  private readonly resetPasswordUsecaseService = inject(ResetPasswordUsecaseService);
  private readonly logoutUsecaseService = inject(LogoutUsecaseService);
  private readonly changePasswordUsecaseService = inject(ChangePasswordUsecaseService);
  private readonly editProfileUsecaseService = inject(EditProfileUsecaseService);
  private readonly deleteAccountUsecaseService = inject(DeleteMeUsecaseService);
  private readonly storageService = inject(StorageService);
  private readonly toasterService = inject(ToasterService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  loginSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.loginSubmitted),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: buttonLoginLoading }))),
      exhaustMap(({ email, password }) =>
        this.loginUsecaseService.execute({ email, password }).pipe(
          map(({ message, token, user }) => AuthApiActions.loginSuccess({ message, token, user })),
          catchError((err: any) =>
            of(
              AuthApiActions.loginFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: buttonLoginLoading })))
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(({ message, token, user }) => {
          this.storageService.setItem('token', token);
          this.storageService.setItem('user', user);
          this.toasterService.show(message);
          this.router.navigateByUrl('/diploma');
        })
      ),
    {
      dispatch: false,
    }
  );
  registerSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.registerSubmitted),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: buttonRegisterLoading }))),
      exhaustMap(({ email, firstName, lastName, password, phone, rePassword, username }) =>
        this.registerUsecaseService
          .execute({
            email,
            firstName,
            lastName,
            password,
            phone,
            rePassword,
            username,
          })
          .pipe(
            map(({ message, token, user }) =>
              AuthApiActions.registerSuccess({ message, token, user })
            ),
            catchError((err: any) =>
              of(
                AuthApiActions.registerFailure({
                  message: err?.message ?? 'An unexpected error occurred',
                })
              )
            ),
            finalize(() =>
              this.store.dispatch(UiActions.stopLoading({ key: buttonRegisterLoading }))
            )
          )
      )
    )
  );
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.registerSuccess),
        tap(({ message, token, user }) => {
          this.storageService.setItem('token', token);
          this.storageService.setItem('user', user);
          this.toasterService.show(message);
          this.router.navigateByUrl('/diploma');
        })
      ),
    {
      dispatch: false,
    }
  );
  forgetSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.forgetPasswordSubmitted),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: buttonForgetLoading }))),
      exhaustMap((originalAction) => {
        return this.forgetPasswordUsecaseService.execute({ email: originalAction.email }).pipe(
          map(({ message }) =>
            AuthApiActions.forgetPasswordSuccess({
              message,
              email: originalAction.email,
            })
          ),

          catchError((err: any) =>
            of(
              AuthApiActions.forgetPasswordFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: buttonForgetLoading })))
        );
      })
    )
  );
  forgetSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.forgetPasswordSuccess),
        tap(({ message, email }) => {
          this.toasterService.show(message);
        })
      ),
    {
      dispatch: false,
    }
  );
  verifySubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.verifyResetCodeSubmitted),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: buttonVerifyLoading }))),
      exhaustMap((originalAction) => {
        return this.verifyResetCodeUsecaseService
          .execute({ resetCode: originalAction.resetCode })
          .pipe(
            map(({ status }) =>
              AuthApiActions.verifyResetCodeSuccess({
                status,
              })
            ),

            catchError((err: any) =>
              of(
                AuthApiActions.verifyResetCodeFailure({
                  message: err?.message ?? 'An unexpected error occurred',
                })
              )
            ),
            finalize(() => this.store.dispatch(UiActions.stopLoading({ key: buttonVerifyLoading })))
          );
      })
    )
  );
  verifyCodeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.verifyResetCodeSuccess),
        tap(({ status }) => {
          this.toasterService.show(status);
        })
      ),
    {
      dispatch: false,
    }
  );
  resetPasswordSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.resetPasswordSubmitted),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: buttonResetLoading }))),
      exhaustMap(({ email, newPassword }) =>
        this.resetPasswordUsecaseService.execute({ email, newPassword }).pipe(
          map(({ message, token }) => AuthApiActions.resetPasswordSuccess({ message, token })),
          catchError((err: any) =>
            of(
              AuthApiActions.loginFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: buttonResetLoading })))
        )
      )
    )
  );
  resetPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.resetPasswordSuccess),
        tap(({ message, token }) => {
          this.toasterService.show(message);
          this.router.navigateByUrl('/login', { replaceUrl: true });
        })
      ),
    {
      dispatch: false,
    }
  );
  logoutSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.logoutSubmitted),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: buttonLogoutLoading }))),

      exhaustMap(() =>
        this.logoutUsecaseService.execute().pipe(
          map(({ message }) => AuthApiActions.logoutSuccess({ message })),
          catchError((err) =>
            of(
              AuthApiActions.logoutFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: buttonLogoutLoading })))
        )
      )
    )
  );
  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.logoutSuccess),
        tap(({ message }) => {
          this.storageService.removeItem('token');
          this.storageService.removeItem('user');
          this.toasterService.show(message);
          this.router.navigateByUrl('/login');
        })
      ),
    {
      dispatch: false,
    }
  );
  rehydrate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.rehydrate),
        tap(({ user }) => {
          setTimeout(() => {
            this.toasterService.show(`Welcome back, ${user.username}!`);
          }, 0);
        })
      ),
    {
      dispatch: false,
    }
  );
  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.changePasswordSubmitted),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: changePasswordLoading }))),
      exhaustMap(({ oldPassword, password, rePassword }) =>
        this.changePasswordUsecaseService.execute({ oldPassword, password, rePassword }).pipe(
          map(({ message, token }) => AuthApiActions.changePasswordSuccess({ message, token })),
          catchError((err: any) =>
            of(
              AuthApiActions.changePasswordFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: changePasswordLoading })))
        )
      )
    )
  );
  changePasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.changePasswordSuccess),
        tap(({ message, token }) => {
          this.storageService.setItem('token', token);
          this.toasterService.show(message);
        })
      ),
    {
      dispatch: false,
    }
  );
  editProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.editProfileSubmitted),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: editProfileLoading }))),
      exhaustMap(({ email, firstName, lastName, phone, username }) =>
        this.editProfileUsecaseService
          .execute({ email, firstName, lastName, phone, username })
          .pipe(
            map(({ message, user }) => AuthApiActions.editProfileSuccess({ message, user })),
            catchError((err: any) =>
              of(
                AuthApiActions.editProfileFailure({
                  message: err?.message ?? 'An unexpected error occurred',
                })
              )
            ),
            finalize(() => this.store.dispatch(UiActions.stopLoading({ key: editProfileLoading })))
          )
      )
    )
  );
  editProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.editProfileSuccess),
        tap(({ message, user }) => {
          this.storageService.setItem('user', user);
          this.toasterService.show(message);
        })
      ),
    {
      dispatch: false,
    }
  );
  deleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.deleteAccountSubmitted),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: deleteAccountLoading }))),
      exhaustMap(() =>
        this.deleteAccountUsecaseService.execute().pipe(
          map(({ message }) => AuthApiActions.deleteAccountSuccess({ message })),
          catchError((err: any) =>
            of(
              AuthApiActions.deleteAccountFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: deleteAccountLoading })))
        )
      )
    )
  );
  deleteAccountSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.deleteAccountSuccess),
        tap(({ message }) => {
          this.storageService.clear();
          this.toasterService.show(message);
          this.router.navigateByUrl('/login', { replaceUrl: true });
        })
      ),
    {
      dispatch: false,
    }
  );
}
