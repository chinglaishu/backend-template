import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ACCOUNT_TYPE_NUM, DEFAULT_LANGUAGE, LANGUAGE, ROLE_NUM } from '../../constant/constant';
import * as mongoose from 'mongoose';
import { BaseEntity, Friend, MultiLang, PersonalInfo } from '../../utils/base/base.entity';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User extends BaseEntity {
  @Prop({ index: { unique: true, sparse: true }})
  username: string;
  @Prop()
  password: string;
  @Prop({ index: { unique: true, sparse: true }})
  phone: string; // will not save phone before verification
  @Prop({ default: ROLE_NUM.USER })
  roleNum: ROLE_NUM;
  @Prop({ index: { unique: true, sparse: true }})
  displayName: string;
  @Prop()
  personalInfo: PersonalInfo;
  @Prop()
  friends: Friend[];
  @Prop({ default: DEFAULT_LANGUAGE })
  language: LANGUAGE;
  @Prop({ default: ACCOUNT_TYPE_NUM.NORMAL })
  accountTypeNum: ACCOUNT_TYPE_NUM;
  @Prop({ index: {unique: true, sparse: true }})
  socialId: string;
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
