import { IsEnum, IsOptional, IsString, Validate } from 'class-validator';
import { ACCOUNT_TYPE_ENUM, DTO_CHECK_ADMIN_FIELD_KEY, ROLE_ENUM } from 'src/constant/constant';
import { AdminFieldConfirmConstraint } from 'src/core/validator/common.validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Validate(AdminFieldConfirmConstraint, [DTO_CHECK_ADMIN_FIELD_KEY])
  username?: string;

  @IsOptional()
  @IsString()
  @Validate(AdminFieldConfirmConstraint, [DTO_CHECK_ADMIN_FIELD_KEY])
  password?: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  @Validate(AdminFieldConfirmConstraint, [DTO_CHECK_ADMIN_FIELD_KEY])
  phone?: string;

  @IsOptional()
  @IsEnum(ROLE_ENUM)
  @Validate(AdminFieldConfirmConstraint, [DTO_CHECK_ADMIN_FIELD_KEY])
  role?: ROLE_ENUM;

  @IsOptional()
  @IsString()
  @Validate(AdminFieldConfirmConstraint, [DTO_CHECK_ADMIN_FIELD_KEY])
  socialId?: string;

  @IsOptional()
  @IsEnum(ACCOUNT_TYPE_ENUM)
  @Validate(AdminFieldConfirmConstraint, [DTO_CHECK_ADMIN_FIELD_KEY])
  accountType?: ACCOUNT_TYPE_ENUM;
}
