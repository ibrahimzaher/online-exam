export interface LoginResDTO {
  message: string;
  token: string;
  user: UserDTO;
}

export interface UserDTO {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export interface RegisterResDTO extends LoginResDTO { }
export interface EditProfileResDTO {
  message: string;
  user: UserDTO;
}
export interface ChangePasswordResDTO {
  message: string;
  token: string;
}
export interface DeleteMeResDTO {
  message: string;
}
export interface LogOutResDTO extends DeleteMeResDTO { }
export interface ProfileDataResDTO extends EditProfileResDTO { }
export interface ForgetPasswordResDTO {
  message: string;
  info: string;
}
export interface VerifyResetCodeResDTO {
  status: string;
}
export interface RestPasswordResDTO {
  message: string;
  token: string;
}