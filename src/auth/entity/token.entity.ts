import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseEntity } from '../../utils/base/base.entity';

export type TokenDocument = Token & mongoose.Document;

@Schema()
export class Token extends BaseEntity {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  refreshToken: string;
  @Prop({ default: true })
  isEnable: boolean;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

TokenSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

TokenSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) { 
    delete ret._id  
  }
});
