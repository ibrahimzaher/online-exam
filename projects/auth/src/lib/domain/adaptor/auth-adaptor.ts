import {
  EditProfileRes,
  ForgetPasswordRes,
  LoginRes,
  ProfileDataRes,
  RegisterRes,
} from '../../data/dto/auth-res';
import { AuthModel, MessageModel, ProfileModel } from '../models/auth.model';

export interface AuthAdaptor {
  adaptLogin(data: LoginRes): AuthModel;
  adaptRegister(data: RegisterRes): AuthModel;
  adaptProfileData(data: ProfileDataRes): ProfileModel;
  adaptEditProfile(data: EditProfileRes): ProfileModel;
  adaptForgetPassword(data: ForgetPasswordRes): MessageModel;
}
