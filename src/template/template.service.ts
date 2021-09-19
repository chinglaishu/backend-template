import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { BaseService } from "../utils/base/base.service";
import { Template, TemplateDocument } from './entities/template.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TemplateService extends BaseService<CreateTemplateDto, UpdateTemplateDto, any> {
  constructor(
    @InjectModel(Template.name) public model: Model<TemplateDocument>,
  ) {
    super(model);
  }

}