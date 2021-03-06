import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { BaseController } from 'src/utils/base/base.controller';
import { TemplateFilterOption } from 'src/core/filter/filter';
import { TemplateDocument } from './entities/template.entity';

@Controller('template')
export class TemplateController extends BaseController<TemplateDocument, CreateTemplateDto, UpdateTemplateDto, TemplateFilterOption> {

  constructor(
    public service: TemplateService,
  ) {
    super(service);
  }
}
