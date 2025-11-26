import { Observable } from 'rxjs';
import {
  AuthModel,
  MessageModel,
  PasswordModel,
  ProfileModel,
  StatusModel,
  UserModel,
} from '../models/auth.model';
import {
  LoginRequest,
  RegisterRequest,
  ChangePasswordReq,
  EditProfileReq,
  ForgetPasswordReq,
  VerifyResetCodeReq,
  ResetPasswordReq,
} from '../../data/dto/auth-req';

export abstract class AuthRepo {
  abstract login(data: LoginRequest): Observable<AuthModel>;
  abstract register(data: RegisterRequest): Observable<AuthModel>;
  abstract changePassword(data: ChangePasswordReq): Observable<PasswordModel>;
  abstract deleteMe(): Observable<MessageModel>;
  abstract logout(): Observable<MessageModel>;
  abstract profileData(): Observable<ProfileModel>;
  abstract editProfile(data: EditProfileReq): Observable<MessageModel>;
  abstract forgetPassword(data: ForgetPasswordReq): Observable<MessageModel>;
  abstract verifyResetCode(data: VerifyResetCodeReq): Observable<StatusModel>;
  abstract resetPassword(data: ResetPasswordReq): Observable<PasswordModel>;
}
