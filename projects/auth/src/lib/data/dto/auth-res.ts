export interface LoginRes {
  message: string;
  token: string;
  user: UserRes;
}

export interface UserRes {
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
export type RegisterRes = LoginRes;

export interface EditProfileRes {
  message: string;
  user: UserRes;
}
export interface ChangePasswordRes {
  message: string;
  token: string;
}
export interface DeleteMeRes {
  message: string;
}
export type LogOutRes = DeleteMeRes;
export type ProfileDataRes = EditProfileRes;
export interface ForgetPasswordRes {
  message: string;
  info: string;
}
export interface VerifyResetCodeRes {
  status: string;
}
export interface RestPasswordRes {
  message: string;
  token: string;
}
