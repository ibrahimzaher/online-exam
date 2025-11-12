export class AuthApiEndPoint {
    static readonly login = `api/v1/auth/signin`;
    static readonly register = `api/v1/auth/signup`;
    static readonly changePassword = `api/v1/auth/changePassword`;
    static readonly deleteMe = `api/v1/auth/deleteMe`;
    static readonly editProfile = `api/v1/auth/editProfile`;
    static readonly logout = `api/v1/auth/logout`;
    static readonly profileData = `api/v1/auth/profileData`;
    static readonly forgotPassword = `api/v1/auth/forgotPassword`;
    static readonly verifyResetCode = `api/v1/auth/verifyResetCode`;
    static readonly resetPassword = `api/v1/auth/resetPassword`;
}
