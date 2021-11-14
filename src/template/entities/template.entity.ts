import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseEntity } from '../../utils/base/base.entity';

export type TemplateDocument = Template & mongoose.Document;

@Schema()
export class Template extends BaseEntity {
}

export const TemplateSchema = SchemaFactory.createForClass(Template);

TemplateSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

TemplateSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {  
    delete ret._id 
    return ret
  }
});
