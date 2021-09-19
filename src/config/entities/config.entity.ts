import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CONFIG_TYPE_NUM, MESSAGE_METHOD_NUM } from 'src/constant/constant';
import { BaseEntity, MultiLang } from '../../utils/base/base.entity';

export type ConfigDocument = Config & mongoose.Document;

@Schema()
export class Config extends BaseEntity {
  @Prop()
  typeNum: CONFIG_TYPE_NUM;
  name: string;
  messageMethodNum: MESSAGE_METHOD_NUM;
  subject: MultiLang;
  content: MultiLang;
};

export const ConfigSchema = SchemaFactory.createForClass(Config);

ConfigSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

ConfigSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id 
    return ret
  }
});
