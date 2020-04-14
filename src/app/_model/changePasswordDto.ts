export class ChangePasswordDto {
    token: string;
    username: string;
    oldPassword: string;
    newPassword: string;
    verificationCode: string;
}