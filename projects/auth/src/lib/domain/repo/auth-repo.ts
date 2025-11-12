import { Observable } from "rxjs";
import { User } from "../entities/user";
import { LoginRequestDTO, RegisterRequestDTO, ChangePasswordReqDTO, EditProfileReqDTO, ForgetPasswordReqDTO, VerifyResetCodeReqDTO, ResetPasswordReqDTO } from "../../data/dto/auth-req.dto";

export abstract class AuthRepo {
    abstract login(data: LoginRequestDTO): Observable<{ message: string; token: string; user: User }>;
    abstract register(data: RegisterRequestDTO): Observable<{ message: string; token: string; user: User }>;
    abstract changePassword(data: ChangePasswordReqDTO): Observable<{ message: string; token: string }>;
    abstract deleteMe(): Observable<{ message: string }>;
    abstract logout(): Observable<{ message: string }>;
    abstract profileData(): Observable<{ message: string; user: User }>;
    abstract editProfile(data: EditProfileReqDTO): Observable<{ message: string }>;
    abstract forgetPassword(data: ForgetPasswordReqDTO): Observable<{ message: string }>;
    abstract verifyResetCode(data: VerifyResetCodeReqDTO): Observable<{ status: string }>;
    abstract resetPassword(data: ResetPasswordReqDTO): Observable<{ message: string; token: string }>;
}
