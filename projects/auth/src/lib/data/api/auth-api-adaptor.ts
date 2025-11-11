import { Injectable } from '@angular/core';
import { AuthAdaptor } from '../../domain/adaptor/auth-adaptor';
import { User } from '../../domain/entities/user';
import { LoginResDTO, RegisterResDTO, ProfileDataResDTO, EditProfileResDTO, ForgetPasswordResDTO } from '../dto/auth-res.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdaptor implements AuthAdaptor {
  adaptLogin(data: LoginResDTO): { message: string, token: string, user: User } {
    return {
      message: data.message,
      token: data.token,
      user: {
        email: data.user.email,
        firstName: data.user.firstName,
        id: data.user._id,
        lastName: data.user.lastName,
        phone: data.user.phone,
        role: data.user.role,
        username: data.user.username,
      }
    }
  }
  adaptRegister(data: RegisterResDTO): { message: string, token: string, user: User } {
    return this.adaptLogin(data);
  }
  adaptProfileData(data: ProfileDataResDTO): { message: string, user: User } {
    return {
      message: data.message,
      user: {
        email: data.user.email,
        firstName: data.user.firstName,
        id: data.user._id,
        lastName: data.user.lastName,
        phone: data.user.phone,
        role: data.user.role,
        username: data.user.username,
      }
    }
  }
  adaptEditProfile(data: EditProfileResDTO): { message: string } {
    return {
      message: data.message,
    }
  }
  adaptForgetPassword(data: ForgetPasswordResDTO): { message: string } {
    return {
      message: data.message,
    }
  }
}
