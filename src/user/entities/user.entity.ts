import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DEFAULT_LANGUAGE, LANGUAGE, ROLE_NUM, SIGNUP_METHOD_NUM } from '../../constant/constant';
import * as mongoose from 'mongoose';
import { BaseEntity, Friend, MultiLang, PersonalInfo } from '../../utils/base/base.entity';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User extends BaseEntity {
  email: string;
  password: string;
  phone: string;
  @Prop({default: ROLE_NUM.USER})
  roleNum: number;
  displayName: string;
  personalInfo: PersonalInfo;
  friends: Friend[];
  @Prop({default: DEFAULT_LANGUAGE})
  language: LANGUAGE;
  @Prop({default: SIGNUP_METHOD_NUM.NORMAL})
  signupMethodNum: SIGNUP_METHOD_NUM;
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
