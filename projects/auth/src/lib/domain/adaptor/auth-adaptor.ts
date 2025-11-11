import { LoginResDTO, RegisterResDTO, ProfileDataResDTO, EditProfileResDTO, ForgetPasswordResDTO } from "../../data/dto/auth-res.dto";
import { User } from "../entities/user";

export interface AuthAdaptor {
    adaptLogin(data: LoginResDTO): { message: string, token: string, user: User };
    adaptRegister(data: RegisterResDTO): { message: string, token: string, user: User };
    adaptProfileData(data: ProfileDataResDTO): { message: string, user: User };
    adaptEditProfile(data: EditProfileResDTO): { message: string };
    adaptForgetPassword(data: ForgetPasswordResDTO): { message: string };
}
