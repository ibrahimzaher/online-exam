import { Injectable } from '@angular/core';
import { AuthAdaptor } from '../../domain/adaptor/auth-adaptor';
import { User } from '../../domain/entities/user';
import {
  LoginResDTO,
  RegisterResDTO,
  ProfileDataResDTO,
  EditProfileResDTO,
  ForgetPasswordResDTO,
} from '../dto/auth-res.dto';
import {
  AuthResponse,
  MessageResponse,
  ProfileResponse,
} from '../../domain/responses/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdaptor implements AuthAdaptor {
  private adaptUser(dto: any): User {
    return {
      id: dto._id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      role: dto.role,
      username: dto.username,
    };
  }
  adaptLogin(data: LoginResDTO): AuthResponse {
    return {
      message: data.message,
      token: data.token,
      user: this.adaptUser(data.user),
    };
  }
  adaptRegister(data: RegisterResDTO): AuthResponse {
    return this.adaptLogin(data);
  }
  adaptProfileData(data: ProfileDataResDTO): ProfileResponse {
    return {
      message: data.message,
      user: this.adaptUser(data.user),
    };
  }
  adaptEditProfile(data: EditProfileResDTO): MessageResponse {
    return {
      message: data.message,
    };
  }
  adaptForgetPassword(data: ForgetPasswordResDTO): MessageResponse {
    return {
      message: data.message,
    };
  }
}
