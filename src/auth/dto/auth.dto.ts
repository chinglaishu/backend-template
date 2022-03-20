import { IsBoolean, IsEmail, IsEnum, IsNumber, IsObject, IsOptional, IsString, Length, NotEquals, ValidateIf, ValidateNested } from 'class-validator';
import { ACCOUNT_TYPE_ENUM } from 'src/constant/constant';

export class SocialAuthDto {
  @IsEnum(ACCOUNT_TYPE_ENUM)
  @NotEquals(ACCOUNT_TYPE_ENUM.NORMAL)
  accountType: ACCOUNT_TYPE_ENUM;

  @IsString()
  token: string;

  @ValidateIf(o => o.accountType === ACCOUNT_TYPE_ENUM.APPLE)
  @IsString()
  clientId?: string;

  @ValidateIf(o => o.accountType === ACCOUNT_TYPE_ENUM.GOOGLE)
  @IsBoolean()
  isAndroid?: boolean;
}

export class SignupDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  code: string;
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
