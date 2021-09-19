import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { CONFIG_TYPE_NUM, MESSAGE_METHOD_NUM } from '../../constant/constant';
import { MultiLang } from 'src/utils/base/base.entity';

export class CreateConfigDto {
  @IsNumber()
  typeNum: CONFIG_TYPE_NUM;
  @IsString()
  name: string;
  @IsNumber()
  messageMethodNum: MESSAGE_METHOD_NUM;
  @ValidateNested()
  subject: MultiLang;
  @ValidateNested()
  content: MultiLang;
}
