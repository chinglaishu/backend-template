import { IsBoolean, IsEmail, IsNumber, IsObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { ACCOUNT_TYPE_NUM } from 'src/constant/constant';

export class SocialAuthDto {
  @IsNumber()
  accountTypeNum: ACCOUNT_TYPE_NUM;

  @IsString()
  token: string;

  @IsOptional()
  @IsString()
  clientId: string;
}

export class SignupDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class SMSRequestDto {
  @IsString()
  phone: string;
  @IsOptional()
  @IsBoolean()
  isSignup?: boolean;
}

export class SMSVerifyDto {
  @IsString()
  phone: string;
  @IsString()
  code: string;
}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class ForgetPasswordRequestDto {
  @IsString()
  username: string;
  @IsString()
  phone: string;
}

export class ForgetPasswordDto {
  @IsString()
  username: string;

  @IsString()
  newPassword: string;

  @IsString()
  code: string;
}

export class ResetPasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}

export class ChangeContactDto {
  @IsString()
  phone: string;

  @IsString()
  code: string;
}

export class CreateRefreshTokenDto {
  @IsString()
  userId: string;
  
  @IsString()
  refreshToken: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
