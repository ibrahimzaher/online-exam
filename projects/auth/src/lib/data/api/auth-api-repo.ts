import { inject, Injectable, Provider } from '@angular/core';
import { AuthApiAdaptor } from './auth-api-adaptor';
import { AuthRepo } from '../../domain/repo/auth-repo';
import { map, Observable } from 'rxjs';
import { User } from '../../domain/entities/user';
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  ChangePasswordReqDTO,
  EditProfileReqDTO,
  ForgetPasswordReqDTO,
  VerifyResetCodeReqDTO,
  ResetPasswordReqDTO,
} from '../dto/auth-req.dto';

import { AuthApiService } from './auth-api-service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiRepo implements AuthRepo {
  private readonly _authService = inject(AuthApiService);
  private readonly _authAdaptor = inject(AuthApiAdaptor);
  login(data: LoginRequestDTO): Observable<{ message: string; token: string; user: User }> {
    return this._authService.login(data).pipe(map((data) => this._authAdaptor.adaptLogin(data)));
  }
  register(data: RegisterRequestDTO): Observable<{ message: string; token: string; user: User }> {
    return this._authService
      .register(data)
      .pipe(map((data) => this._authAdaptor.adaptRegister(data)));
  }
  changePassword(data: ChangePasswordReqDTO): Observable<{ message: string; token: string }> {
    return this._authService.changePassword(data);
  }
  deleteMe(): Observable<{ message: string }> {
    return this._authService.deleteMe();
  }
  logout(): Observable<{ message: string }> {
    return this._authService.logout();
  }
  profileData(): Observable<{ message: string; user: User }> {
    return this._authService
      .profileData()
      .pipe(map((data) => this._authAdaptor.adaptProfileData(data)));
  }
  editProfile(data: EditProfileReqDTO): Observable<{ message: string }> {
    return this._authService
      .editProfile(data)
      .pipe(map((data) => this._authAdaptor.adaptEditProfile(data)));
  }
  forgetPassword(data: ForgetPasswordReqDTO): Observable<{ message: string }> {
    return this._authService
      .forgetPassword(data)
      .pipe(map((data) => this._authAdaptor.adaptForgetPassword(data)));
  }
  verifyResetCode(data: VerifyResetCodeReqDTO): Observable<{ status: string }> {
    return this._authService.verifyResetCode(data);
  }
  resetPassword(data: ResetPasswordReqDTO): Observable<{ message: string; token: string }> {
    return this._authService.resetPassword(data);
  }
}
export const AUTH_PROVIDERS: Provider[] = [{ provide: AuthRepo, useClass: AuthApiRepo }];
