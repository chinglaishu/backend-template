import { Prop } from '@nestjs/mongoose';
import { IsArray, IsEmail, IsNumber, IsObject, IsString, Length, ValidateNested } from 'class-validator';
import { LANGUAGE, ROLE_NUM, ACCOUNT_TYPE_NUM } from '../../constant/constant';
import { Friend, PersonalInfo, Target } from 'src/utils/base/base.entity';

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @Length(8, 20)
  password?: string;

  @IsString()
  phone?: string;

  @IsNumber()
  roleNum?: ROLE_NUM;

  @IsString()
  displayName?: string;

  @IsObject()
  personalInfo?: PersonalInfo;

  @IsObject()
  target?: Target;

  @IsArray()
  friends?: Friend[];

  @IsString()
  lang?: LANGUAGE;

  @IsNumber()
  accountTypeNum?: ACCOUNT_TYPE_NUM;
}
