import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from 'src/utils/base/base.controller';
import { UserFilterOption } from 'src/core/filter/filter';

@Controller('user')
export class UserController extends BaseController<CreateUserDto, UpdateUserDto, UserFilterOption> {

  constructor(
    public service: UserService,
  ) {
    super(service);
  }
}
