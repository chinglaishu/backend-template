import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserByPhoneDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from 'src/utils/base/base.controller';
import { BaseFilterOption, UserFilterOption } from 'src/core/filter/filter';
import { User, UserDocument } from './entities/user.entity';
import { Lang } from 'src/core/decorator/lang.decorator';
import { LANGUAGE, ROLE_ENUM } from 'src/constant/constant';
import { ReqUser } from 'src/core/decorator/user.decorator';
import utilsFunction from 'src/utils/utilsFunction/utilsFunction';
import { Roles } from 'src/core/authorization/role.decorator';
import { preprocessFilter } from 'src/core/filter/helper';

@Controller('user')
export class UserController extends BaseController<UserDocument, CreateUserDto, UpdateUserDto, UserFilterOption> {

  constructor(
    public service: UserService,
  ) {
    super(service);
    this.findOneCheckUser = true;
    this.checkBelongUser = true;
  }

  @Roles(ROLE_ENUM.ADMIN)
  @Post()
  async create(@ReqUser() user: User, @Body() createDto: CreateUserByPhoneDto, @Lang() lang: LANGUAGE) {
    return this.service.create(createDto);
  }

  @Roles(ROLE_ENUM.USER)
  @Put(':id')
  async update(@ReqUser() user: User, @Param('id') id: string, @Body() updateDto: UpdateUserDto, @Lang() lang: LANGUAGE) {
    const filter: BaseFilterOption = {_id: id};
    preprocessFilter(filter, this.checkBelongUser, user);
    return await this.service.updateOneWithFilter(id, updateDto, true);
  }
}
