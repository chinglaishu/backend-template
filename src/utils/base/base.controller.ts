import { Get, Param, Post, Body, Put, Delete, Req, Request} from "@nestjs/common";
import { Filter } from "src/core/decorator/filter.decorator";
import { Lang } from "src/core/decorator/lang.decorator";
import { PageOption, Pagination } from "src/core/decorator/pagination.decorator";
import { Public } from "src/core/decorator/public.decorator";
import { Search, SearchOption } from "src/core/decorator/search.decorator";
import { Sort } from "src/core/decorator/sort.decorator";
import { ReqUser } from "src/core/decorator/user.decorator";
import { User } from "src/user/entities/user.entity";
import { BaseService } from "./base.service";

export class BaseController<CreateDto, UpdateDto, FilterOption> {
    constructor(
      public service: any | BaseService<CreateDto, UpdateDto, FilterOption>,
    ) {}
    
    @Post()
    async create(@ReqUser() user: User, @Body() createDto: CreateDto, @Lang() lang: string) {
      return this.service.create(createDto);
    }

    @Get()
    async findAll(@ReqUser() user: User, @Filter() filter: FilterOption, @Pagination() pagination: PageOption, @Sort() sort: any = {}, @Search() search: SearchOption = {searchFilter: {}}) {
      const {page, pageSize} = pagination;
      const {searchFilter} = search;
      filter = {...filter, ...searchFilter};
      return this.service.findAll(filter, page, pageSize);
    }
  
    @Get(':id')
    async findOne(@ReqUser() user: User, @Param('id') id: string) {
      return this.service.findOne(id, true);
    }

    @Put(':id')
    async update(@ReqUser() user: User, @Param('id') id: string, @Body() updateDto: UpdateDto, @Lang() lang: string) {
      const result = await this.service.update(id, updateDto, true);
      return result;
    }

    @Delete(':id')
    async remove(@ReqUser() user: User, @Param('id') id: string, @Lang() lang: string) {
      return this.service.remove(id, true);
    }
}
