import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ACCOUNT_TYPE_ENUM, ROLE_ENUM } from 'src/constant/constant';
import { BaseEntity } from '../../utils/base/base.entity';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User extends BaseEntity {
  @Prop({unique: true, required: true})
  username: string;
  @Prop()
  password: string;
  @Prop()
  displayName: string;
  @Prop({required: true, default: ROLE_ENUM.USER})
  role: ROLE_ENUM;
  @Prop()
  phone: string;
  @Prop({required: true, default: ACCOUNT_TYPE_ENUM.NORMAL})
  accountType: ACCOUNT_TYPE_ENUM;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {  
    delete ret["password"]
    delete ret._id 
    return ret
  }
});
