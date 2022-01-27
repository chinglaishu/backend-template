import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ROLE_NUM } from 'src/constant/constant';
import { BaseEntity } from '../../utils/base/base.entity';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User extends BaseEntity {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  displayName: string;
  @Prop()
  role: ROLE_NUM;
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
