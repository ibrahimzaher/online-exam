import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
  ChangePasswordReq,
  EditProfileReq,
  ForgetPasswordReq,
  VerifyResetCodeReq,
  ResetPasswordReq,
} from '../dto/auth-req';
import { AuthApiEndPoint } from './auth-api-end-point';
import { API_CONFIG } from '../../config/api-config.token';
import {
  LoginRes,
  ChangePasswordRes,
  DeleteMeRes,
  LogOutRes,
  ProfileDataRes,
  EditProfileRes,
  ForgetPasswordRes,
  VerifyResetCodeRes,
  RestPasswordRes,
} from '../dto/auth-res';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _config = inject(API_CONFIG);
  login(data: LoginRequest): Observable<LoginRes> {
    return this._httpClient.post<LoginRes>(this._config.baseUrl + AuthApiEndPoint.login, data);
  }
  register(data: RegisterRequest): Observable<LoginRes> {
    return this._httpClient.post<LoginRes>(this._config.baseUrl + AuthApiEndPoint.register, data);
  }
  changePassword(data: ChangePasswordReq): Observable<ChangePasswordRes> {
    return this._httpClient.patch<ChangePasswordRes>(
      this._config.baseUrl + AuthApiEndPoint.changePassword,
      data
    );
  }
  deleteMe(): Observable<DeleteMeRes> {
    return this._httpClient.delete<DeleteMeRes>(this._config.baseUrl + AuthApiEndPoint.deleteMe);
  }
  logout(): Observable<LogOutRes> {
    return this._httpClient.get<LogOutRes>(this._config.baseUrl + AuthApiEndPoint.logout);
  }
  profileData(): Observable<ProfileDataRes> {
    return this._httpClient.get<ProfileDataRes>(this._config.baseUrl + AuthApiEndPoint.profileData);
  }
  editProfile(data: EditProfileReq): Observable<EditProfileRes> {
    return this._httpClient.put<EditProfileRes>(
      this._config.baseUrl + AuthApiEndPoint.editProfile,
      data
    );
  }
  forgetPassword(data: ForgetPasswordReq): Observable<ForgetPasswordRes> {
    return this._httpClient.post<ForgetPasswordRes>(
      this._config.baseUrl + AuthApiEndPoint.forgotPassword,
      data
    );
  }
  verifyResetCode(data: VerifyResetCodeReq): Observable<VerifyResetCodeRes> {
    return this._httpClient.post<VerifyResetCodeRes>(
      this._config.baseUrl + AuthApiEndPoint.verifyResetCode,
      data
    );
  }
  resetPassword(data: ResetPasswordReq): Observable<RestPasswordRes> {
    return this._httpClient.put<RestPasswordRes>(
      this._config.baseUrl + AuthApiEndPoint.resetPassword,
      data
    );
  }
}
