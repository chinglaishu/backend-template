import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CONFIG_TYPE_ENUM, MESSAGE_METHOD_ENUM } from 'src/constant/constant';
import { BaseEntity, MultiLang } from '../../utils/base/base.entity';

export type ConfigDocument = Config & mongoose.Document;

@Schema()
export class Config extends BaseEntity {
  @Prop({ required: true, index: { unique: true } })
  type: CONFIG_TYPE_ENUM;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  messageMethod: MESSAGE_METHOD_ENUM;
  @Prop({ required: true })
  subject: MultiLang;
  @Prop({ required: true })
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
