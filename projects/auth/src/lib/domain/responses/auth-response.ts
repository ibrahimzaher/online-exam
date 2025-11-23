import { User } from '../entities/user';

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ProfileResponse {
  message: string;
  user: User;
}

export interface MessageResponse {
  message: string;
}
export interface StatusResponse {
  status: string;
}

export interface PasswordResponse {
  message: string;
  token: string;
}
