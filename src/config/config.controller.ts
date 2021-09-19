import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { BaseController } from 'src/utils/base/base.controller';

@Controller('config')
export class ConfigController extends BaseController<CreateConfigDto, UpdateConfigDto, any> {

  constructor(
    public service: ConfigService,
  ) {
    super(service);
  }

}
