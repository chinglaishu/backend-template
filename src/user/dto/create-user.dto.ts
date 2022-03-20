import { IsEnum, IsOptional, IsString, Validate } from 'class-validator';
import { ACCOUNT_TYPE_ENUM, DTO_CHECK_ADMIN_FIELD_KEY, ROLE_ENUM } from 'src/constant/constant';
import { AdminFieldConfirmConstraint } from 'src/core/validator/common.validator';

export type CreateUserDto = CreateUserByPhoneDto | CreateUserBySocialAccountDto;

export class CreateUserByPhoneDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  displayName?: string;
  @IsString()
  phone: string;
  @IsOptional()
  @IsEnum(ROLE_ENUM)
  @Validate(AdminFieldConfirmConstraint, [DTO_CHECK_ADMIN_FIELD_KEY])
  role?: ROLE_ENUM;
};

export class CreateUserBySocialAccountDto {
  @IsString()
  socialId: string;
  @IsEnum(ACCOUNT_TYPE_ENUM)
  accountType: ACCOUNT_TYPE_ENUM;
};
