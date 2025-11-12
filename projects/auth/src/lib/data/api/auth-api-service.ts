import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginRequestDTO, RegisterRequestDTO, ChangePasswordReqDTO, EditProfileReqDTO, ForgetPasswordReqDTO, VerifyResetCodeReqDTO, ResetPasswordReqDTO } from '../dto/auth-req.dto';
import { AuthApiEndPoint } from './auth-api-end-point';
import { API_CONFIG } from '../../config/api-config.token';
import { LoginResDTO, ChangePasswordResDTO, DeleteMeResDTO, LogOutResDTO, ProfileDataResDTO, EditProfileResDTO, ForgetPasswordResDTO, VerifyResetCodeResDTO, RestPasswordResDTO } from '../dto/auth-res.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _config = inject(API_CONFIG);
  login(data: LoginRequestDTO): Observable<LoginResDTO> {
    return this._httpClient.post<LoginResDTO>(this._config.baseUrl + AuthApiEndPoint.login, data);
  }
  register(data: RegisterRequestDTO): Observable<LoginResDTO> {
    return this._httpClient.post<LoginResDTO>(this._config.baseUrl + AuthApiEndPoint.register, data);
  }
  changePassword(data: ChangePasswordReqDTO): Observable<ChangePasswordResDTO> {
    return this._httpClient.patch<ChangePasswordResDTO>(this._config.baseUrl + AuthApiEndPoint.changePassword, data);
  }
  deleteMe(): Observable<DeleteMeResDTO> {
    return this._httpClient.delete<DeleteMeResDTO>(this._config.baseUrl + AuthApiEndPoint.deleteMe,);
  }
  logout(): Observable<LogOutResDTO> {
    return this._httpClient.get<LogOutResDTO>(this._config.baseUrl + AuthApiEndPoint.logout);
  }
  profileData(): Observable<ProfileDataResDTO> {
    return this._httpClient.get<ProfileDataResDTO>(this._config.baseUrl + AuthApiEndPoint.profileData);
  }
  editProfile(data: EditProfileReqDTO): Observable<EditProfileResDTO> {
    return this._httpClient.put<EditProfileResDTO>(this._config.baseUrl + AuthApiEndPoint.editProfile, data);
  }
  forgetPassword(data: ForgetPasswordReqDTO): Observable<ForgetPasswordResDTO> {
    return this._httpClient.post<ForgetPasswordResDTO>(this._config.baseUrl + AuthApiEndPoint.forgotPassword, data);
  }
  verifyResetCode(data: VerifyResetCodeReqDTO): Observable<VerifyResetCodeResDTO> {
    return this._httpClient.post<VerifyResetCodeResDTO>(this._config.baseUrl + AuthApiEndPoint.verifyResetCode, data);
  }
  resetPassword(data: ResetPasswordReqDTO): Observable<RestPasswordResDTO> {
    return this._httpClient.put<RestPasswordResDTO>(this._config.baseUrl + AuthApiEndPoint.resetPassword, data);
  }
}
