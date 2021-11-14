import { Get, Param, Post, Body, Put, Delete, Req, Request} from "@nestjs/common";
import { LANGUAGE, ROLE_NUM } from "src/constant/constant";
import { Filter } from "src/core/decorator/filter.decorator";
import { Lang } from "src/core/decorator/lang.decorator";
import { PageOption, Pagination } from "src/core/decorator/pagination.decorator";
import { Public } from "src/core/decorator/public.decorator";
import { Search, SearchOption } from "src/core/decorator/search.decorator";
import { Sort } from "src/core/decorator/sort.decorator";
import { ReqUser } from "src/core/decorator/user.decorator";
import { User } from "src/user/entities/user.entity";
import utilsFunction from "../utilsFunction/utilsFunction";
import { BaseService } from "./base.service";

export class BaseController<CreateDto, UpdateDto, FilterOption> {
  constructor(
    public service: BaseService<CreateDto, UpdateDto, FilterOption>,
    public findOneCheckUser: boolean = false,
    public findAllCheckUser: boolean = true,
    public updateCheckUser: boolean = true,
    public readOnly: boolean = false,
  ) {}
  
  @Post()
  async create(@ReqUser() user: User, @Body() createDto: CreateDto, @Lang() lang: LANGUAGE) {
    utilsFunction.checkReadOnly(this.readOnly, user);
    return this.service.create(createDto);
  }

  @Get()
  async findAll(@ReqUser() user: User, @Filter() filter: FilterOption, @Pagination() pagination: PageOption, @Sort() sort: any = {}, @Search() search: SearchOption = {searchFilter: {}}) {
    const {page, pageSize} = pagination;
    const {searchFilter} = search;
    filter = {...filter, ...searchFilter};
    return this.service.findAll(filter, page, pageSize, utilsFunction.getCheckUser(this.findAllCheckUser, user), sort);
  }

  @Get(':id')
  async findOne(@ReqUser() user: User, @Param('id') id: string) {
    return this.service.findOne(id, true, utilsFunction.getCheckUser(this.findOneCheckUser, user));
  }

  @Put(':id')
  async update(@ReqUser() user: User, @Param('id') id: string, @Body() updateDto: UpdateDto, @Lang() lang: LANGUAGE) {
    utilsFunction.checkReadOnly(this.readOnly, user);
    return await this.service.update(id, updateDto, true, utilsFunction.getCheckUser(this.updateCheckUser, user));
  }

  @Delete(':id')
  async remove(@ReqUser() user: User, @Param('id') id: string, @Lang() lang: LANGUAGE) {
    utilsFunction.checkReadOnly(this.readOnly, user);
    return this.service.remove(id, true, utilsFunction.getCheckUser(this.updateCheckUser, user));
  }
}
