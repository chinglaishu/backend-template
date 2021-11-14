import { IsArray, IsEmail, IsNumber, IsObject, IsString, Length, ValidateNested } from 'class-validator';
import { LANGUAGE, ROLE_NUM, ACCOUNT_TYPE_NUM } from '../../constant/constant';
import { PersonalInfo, Target } from 'src/utils/base/base.entity';

export class CreateUserDto {
  @IsString()
  username?: string;

  @IsString()
  @Length(8, 20)
  password?: string;

  // @IsString()
  // displayName?: string;

  // @IsObject()
  // personalInfo?: PersonalInfo;

  // @IsObject()
  // target?: Target;

  // @IsString()
  // language?: LANGUAGE;

  @IsNumber()
  accountTypeNum?: ACCOUNT_TYPE_NUM;

  @IsString()
  socialId?: string;
}
