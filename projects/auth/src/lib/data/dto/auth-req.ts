export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface ChangePasswordReq {
  oldPassword: string;
  password: string;
  rePassword: string;
}
export interface EditProfileReq {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
export interface ForgetPasswordReq {
  email: string;
}
export interface VerifyResetCodeReq {
  resetCode: string;
}
export interface ResetPasswordReq {
  email: string;
  newPassword: string;
}
