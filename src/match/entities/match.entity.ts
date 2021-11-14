import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { MATCH_METHOD_NUM, MATCH_STATUS_NUM } from 'src/constant/constant';
import { BaseEntity } from '../../utils/base/base.entity';

export type MatchDocument = Match & mongoose.Document;

@Schema()
export class Match extends BaseEntity {
  @Prop()
  fromUserId: string;
  @Prop()
  toUserId: string;
  @Prop()
  method: MATCH_METHOD_NUM;
  @Prop({default: MATCH_STATUS_NUM.WAITING})
  status: MATCH_STATUS_NUM;
}

export const MatchSchema = SchemaFactory.createForClass(Match);

MatchSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

MatchSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {  
    delete ret._id 
    return ret
  }
});
