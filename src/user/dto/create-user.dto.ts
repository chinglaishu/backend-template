import { IsArray, IsEmail, IsNumber, IsObject, IsString, Length, ValidateNested } from 'class-validator';
import { LANGUAGE, ROLE_NUM, SIGNUP_METHOD_NUM } from '../../constant/constant';
import { PersonalInfo, Target } from 'src/utils/base/base.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password?: string;

  @IsString()
  displayName?: string;

  @IsObject()
  personalInfo?: PersonalInfo;

  @IsObject()
  target?: Target;

  @IsString()
  lang?: LANGUAGE;

  @IsNumber()
  signupMethodNum?: SIGNUP_METHOD_NUM;
}
