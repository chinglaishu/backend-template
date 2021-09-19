import { IsEmail, IsNumber, IsObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

export class GoogleAuthDto {
  @IsString()
  token: string;
}

export class SignupDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  code: string;
}

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class SMSRequest {
  @IsString()
  phone: string;
}

export class ForgetPasswordRequestDto {
  @IsString()
  email: string;
  @IsString()
  phone: string;
}

export class ForgetPasswordDto {
  @IsString()
  email: string;

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
