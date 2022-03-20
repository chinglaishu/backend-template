import { Get, Param, Post, Body, Put, Delete, Req, Request, UsePipes, ValidationPipe} from "@nestjs/common";
import { Document } from "mongoose";
import { LANGUAGE, ROLE_ENUM } from "src/constant/constant";
import { Roles } from "src/core/authorization/role.decorator";
import { Filter } from "src/core/decorator/filter.decorator";
import { Lang } from "src/core/decorator/lang.decorator";
import { PageOption, Pagination } from "src/core/decorator/pagination.decorator";
import { Public } from "src/core/decorator/public.decorator";
import { Search, SearchOption } from "src/core/decorator/search.decorator";
import { Sort } from "src/core/decorator/sort.decorator";
import { ReqUser } from "src/core/decorator/user.decorator";
import { BaseFilterOption } from "src/core/filter/filter";
import { preprocessFilter } from "src/core/filter/helper";
import { User } from "src/user/entities/user.entity";
import utilsFunction from "../utilsFunction/utilsFunction";
import { BaseEntity } from "./base.entity";
import { BaseService } from "./base.service";


export class BaseController<UseDocument extends Document<BaseEntity>, CreateDto, UpdateDto, FilterOption> {
  constructor(
    public service: BaseService<UseDocument, CreateDto, UpdateDto, FilterOption | BaseFilterOption>,
    public findOneCheckUser: boolean = false,
    public findAllCheckUser: boolean = true,
    public updateCheckUser: boolean = true,
    public checkBelongUser: boolean = true,
  ) {}

  @Roles(ROLE_ENUM.ADMIN)
  @Post()
  async create(@ReqUser() user: User, @Body() createDto: CreateDto, @Lang() lang: LANGUAGE) {
    preprocessFilter(createDto, this.checkBelongUser, user);
    return this.service.create(createDto);
  }

  @Get()
  async findAll(@ReqUser() user: User, @Filter() filter: FilterOption, @Pagination() pagination: PageOption, @Sort() sort: any = {}, @Search() search: SearchOption = {searchFilter: {}}) {
    const {page, pageSize} = pagination;
    const {searchFilter} = search;
    filter = {...filter, ...searchFilter};
    preprocessFilter(filter, this.checkBelongUser, user);
    return this.service.findAll(filter, page, pageSize, sort);
  }

  @Get(':id')
  async findOne(@ReqUser() user: User, @Param('id') id: string) {
    const filter: BaseFilterOption = {_id: id};
    preprocessFilter(filter, this.checkBelongUser, user);
    return this.service.findOneWithFilter(filter, true);
  }

  @Get('get/all')
  async findAllWithoutPagination(@ReqUser() user: User, @Filter() filter: FilterOption, @Sort() sort: any = {}, @Search() search: SearchOption = {searchFilter: {}}) {
    const {searchFilter} = search;
    filter = {...filter, ...searchFilter};
    preprocessFilter(filter, this.checkBelongUser, user);
    return this.service.findAllWithoutPagination(filter, sort);
  }

  @Get('get/one')
  async findOneWithFilter(@ReqUser() user: User, @Filter() filter: FilterOption, @Search() search: SearchOption = {searchFilter: {}}) {
    const {searchFilter} = search;
    filter = {...filter, ...searchFilter};
    preprocessFilter(filter, this.checkBelongUser, user);
    return this.service.findOneWithFilter(filter, true);
  }

  @Roles(ROLE_ENUM.ADMIN)
  @Put(':id')
  async update(@ReqUser() user: User, @Param('id') id: string, @Body() updateDto: UpdateDto, @Lang() lang: LANGUAGE) {
    const filter: BaseFilterOption = {_id: id};
    preprocessFilter(filter, this.checkBelongUser, user);
    return await this.service.updateOneWithFilter(filter, updateDto, true);
  }

  @Roles(ROLE_ENUM.ADMIN)
  @Delete(':id')
  async remove(@ReqUser() user: User, @Param('id') id: string, @Lang() lang: LANGUAGE) {
    const filter: BaseFilterOption = {_id: id};
    preprocessFilter(filter, this.checkBelongUser, user);
    return this.service.removeOneWithFilter(filter, true);
  }
}
