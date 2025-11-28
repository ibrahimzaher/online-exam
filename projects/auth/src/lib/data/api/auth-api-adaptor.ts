import { Injectable } from '@angular/core';
import { AuthAdaptor } from '../../domain/adaptor/auth-adaptor';
import { AuthModel, MessageModel, ProfileModel, UserModel } from '../../domain/models/auth.model';
import {
  LoginRes,
  RegisterRes,
  ProfileDataRes,
  EditProfileRes,
  ForgetPasswordRes,
} from '../dto/auth-res';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdaptor implements AuthAdaptor {
  private adaptUser(dto: any): UserModel {
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
  adaptLogin(data: LoginRes): AuthModel {
    return {
      message: data.message,
      token: data.token,
      user: this.adaptUser(data.user),
    };
  }
  adaptRegister(data: RegisterRes): AuthModel {
    return this.adaptLogin(data);
  }
  adaptProfileData(data: ProfileDataRes): ProfileModel {
    return {
      message: data.message,
      user: this.adaptUser(data.user),
    };
  }
  adaptEditProfile(data: EditProfileRes): MessageModel {
    return {
      message: data.message,
    };
  }
  adaptForgetPassword(data: ForgetPasswordRes): MessageModel {
    return {
      message: data.message,
    };
  }
}
