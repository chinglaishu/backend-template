import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { BaseController } from 'src/utils/base/base.controller';

@Controller('template')
export class TemplateController extends BaseController<CreateTemplateDto, UpdateTemplateDto, any> {

  constructor(
    public service: TemplateService,
  ) {
    super(service);
  }

}
