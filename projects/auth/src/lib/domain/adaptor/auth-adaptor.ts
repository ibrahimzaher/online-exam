import {
  EditProfileResDTO,
  ForgetPasswordResDTO,
  LoginResDTO,
  ProfileDataResDTO,
  RegisterResDTO,
} from '../../data/dto/auth-res.dto';
import { AuthResponse, MessageResponse, ProfileResponse } from '../responses/auth-response';

export interface AuthAdaptor {
  adaptLogin(data: LoginResDTO): AuthResponse;
  adaptRegister(data: RegisterResDTO): AuthResponse;
  adaptProfileData(data: ProfileDataResDTO): ProfileResponse;
  adaptEditProfile(data: EditProfileResDTO): MessageResponse;
  adaptForgetPassword(data: ForgetPasswordResDTO): MessageResponse;
}
