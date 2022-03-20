import { IsEnum, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { CONFIG_TYPE_ENUM, MESSAGE_METHOD_ENUM } from '../../constant/constant';
import { MultiLang } from 'src/utils/base/base.entity';

export class CreateConfigDto {
  @IsEnum(CONFIG_TYPE_ENUM)
  type: CONFIG_TYPE_ENUM;
  @IsString()
  name: string;
  @IsEnum(MESSAGE_METHOD_ENUM)
  messageMethod: MESSAGE_METHOD_ENUM;
  @ValidateNested()
  subject: MultiLang;
  @ValidateNested()
  content: MultiLang;
}
