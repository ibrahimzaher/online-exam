import { inject, Injectable } from '@angular/core';
import { LoginRequestDTO, RegisterRequestDTO, ChangePasswordReqDTO, EditProfileReqDTO, ForgetPasswordReqDTO, ResetPasswordReqDTO, VerifyResetCodeReqDTO } from '../data/dto/auth-req.dto';
import { ChangePasswordUsecaseService } from '../domain/use-cases/change-password.usecase.service';
import { DeleteMeUsecaseService } from '../domain/use-cases/delete-me.usecase.service';
import { EditProfileUsecaseService } from '../domain/use-cases/edit-profile.usecase.service';
import { ForgetPaswwordUsecaseService } from '../domain/use-cases/forget-paswword.usecase.service';
import { LoginUsecaseService } from '../domain/use-cases/login.usecase.service';
import { LogoutUsecaseService } from '../domain/use-cases/logout.usecase.service';
import { ProfileDataUsecaseService } from '../domain/use-cases/profile-data.usecase.service';
import { RegisterUsecaseService } from '../domain/use-cases/register.usecase.service';
import { ResetPasswordUsecaseService } from '../domain/use-cases/reset-password.usecase.service';
import { VerifyResetCodeUsecaseService } from '../domain/use-cases/verify-reset-code.usecase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly _loginUseCase = inject(LoginUsecaseService);
  private readonly _registerUsecaseService = inject(RegisterUsecaseService);
  private readonly _changePasswordUsecaseService = inject(ChangePasswordUsecaseService);
  private readonly _deleteMeUsecaseService = inject(DeleteMeUsecaseService);
  private readonly _editProfileUsecaseService = inject(EditProfileUsecaseService);
  private readonly _forgetPaswwordUsecaseService = inject(ForgetPaswwordUsecaseService);
  private readonly _logoutUsecaseService = inject(LogoutUsecaseService);
  private readonly _profileDataUsecaseService = inject(ProfileDataUsecaseService);
  private readonly _resetPasswordUsecaseService = inject(ResetPasswordUsecaseService);
  private readonly _verifyResetCodeUsecaseService = inject(VerifyResetCodeUsecaseService);
  login(data: LoginRequestDTO) {
    return this._loginUseCase.execute(data);
  }

  register(data: RegisterRequestDTO) {
    return this._registerUsecaseService.execute(data);
  }
  changePassword(data: ChangePasswordReqDTO) {
    return this._changePasswordUsecaseService.execute(data);
  }
  deleteMe() {
    return this._deleteMeUsecaseService.execute();
  }
  editProfile(data: EditProfileReqDTO) {
    return this._editProfileUsecaseService.execute(data);
  }
  forgetPassword(data: ForgetPasswordReqDTO) {
    return this._forgetPaswwordUsecaseService.execute(data);
  }
  logOut() {
    return this._logoutUsecaseService.execute();
  }
  profileData() {
    return this._profileDataUsecaseService.execute();
  }
  resetPassword(data: ResetPasswordReqDTO) {
    return this._resetPasswordUsecaseService.execute(data);
  }
  verifyResetCode(data: VerifyResetCodeReqDTO) {
    return this._verifyResetCodeUsecaseService.execute(data);
  }
}
