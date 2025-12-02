import { inject, Injectable, Provider } from '@angular/core';
import { AuthApiAdaptor } from './auth-api-adaptor';
import { AuthRepo } from '../../domain/repo/auth-repo';
import { map, Observable } from 'rxjs';

import { AuthApiService } from './auth-api-service';
import {
  LoginRequest,
  RegisterRequest,
  ChangePasswordReq,
  EditProfileReq,
  ForgetPasswordReq,
  VerifyResetCodeReq,
  ResetPasswordReq,
} from '../dto/auth-req';
import {
  AuthModel,
  MessageModel,
  PasswordModel,
  ProfileModel,
  StatusModel,
  UserModel,
} from '../../domain/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiRepo implements AuthRepo {
  private readonly _authService = inject(AuthApiService);
  private readonly _authAdaptor = inject(AuthApiAdaptor);
  login(data: LoginRequest): Observable<AuthModel> {
    return this._authService.login(data).pipe(map((data) => this._authAdaptor.adaptLogin(data)));
  }
  register(data: RegisterRequest): Observable<AuthModel> {
    return this._authService
      .register(data)
      .pipe(map((data) => this._authAdaptor.adaptRegister(data)));
  }
  changePassword(data: ChangePasswordReq): Observable<PasswordModel> {
    return this._authService.changePassword(data);
  }
  deleteMe(): Observable<MessageModel> {
    return this._authService.deleteMe();
  }
  logout(): Observable<MessageModel> {
    return this._authService.logout();
  }
  profileData(): Observable<{ message: string; user: UserModel }> {
    return this._authService
      .profileData()
      .pipe(map((data) => this._authAdaptor.adaptProfileData(data)));
  }
  editProfile(data: EditProfileReq): Observable<ProfileModel> {
    return this._authService
      .editProfile(data)
      .pipe(map((data) => this._authAdaptor.adaptEditProfile(data)));
  }
  forgetPassword(data: ForgetPasswordReq): Observable<MessageModel> {
    return this._authService
      .forgetPassword(data)
      .pipe(map((data) => this._authAdaptor.adaptForgetPassword(data)));
  }
  verifyResetCode(data: VerifyResetCodeReq): Observable<StatusModel> {
    return this._authService.verifyResetCode(data);
  }
  resetPassword(data: ResetPasswordReq): Observable<PasswordModel> {
    return this._authService.resetPassword(data);
  }
}
