export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface ChangePasswordReqDTO {
  oldPassword: string;
  password: string;
  rePassword: string;
}
export interface EditProfileReqDTO {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
}
export interface ForgetPasswordReqDTO {
  email: string;
}
export interface VerifyResetCodeReqDTO {
  resetCode: string;
}
export interface ResetPasswordReqDTO {
  email: string;
  newPassword: string;
}