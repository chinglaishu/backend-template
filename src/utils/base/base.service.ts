import { HttpException, Injectable } from '@nestjs/common';
import { ROLE_NUM } from '../../constant/constant';
import { User } from 'src/user/entities/user.entity';
import utilsFunction from '../utilsFunction/utilsFunction';
import { PaginationEntity } from "./base.entity";

export class BaseService<CreateDto, UpdateDto, FilterOption> {
  constructor(
    public model: any,
  ) {}

  create(createDto: CreateDto) {
    return this.model.create(createDto);
  }

  // if only admin can get all and filter do not have a userId then userId will add to the filter
  async findAll(filter: FilterOption, page: number, pageSize: number, checkIfAddUserIdByUser: User | null = null, sort: any = {}) {
    filter = utilsFunction.checkIfAddUserId("userId", checkIfAddUserIdByUser, filter);
  
    let totalCount, data;

    filter = this.createFilterForTime(filter);

    totalCount = await this.model.count(filter);

    data = await this.model.find(filter).sort(sort).skip((page - 1) * pageSize).limit(+pageSize).exec();

    if (Object.keys(sort).length === 0) {
      data.sort((a: any, b: any) => a.index - b.index);
    }

    const result = new PaginationEntity();
    result.data = data
    result.page = page;
    result.pageSize = pageSize;
    result.totalPage = Math.ceil(totalCount/pageSize);
    return result;
  }

  async findAllWithoutFilter() {
    return await this.model.find();
  }

  async findOne(id: string, throwErrorIfNotFound: boolean = false, checkBelongToUser: User | null = null) {
    const filter = this.getFilterByIfCheckBelongToUser(id, checkBelongToUser);
    const result = await this.model.findOne(filter);
    if (!result && throwErrorIfNotFound) {
      throw new HttpException("item not found or do not belong to user", 500);
    }
    return result;
  }

  async findOneWithFilter(filter: any, throwErrorIfNotFound: boolean = false) {
    const result = await this.model.findOne(filter);
    if (!result && throwErrorIfNotFound) {
      throw new HttpException("item not found", 500);
    }
    return result;
  }

  async count(filter: any) {
    const count = await this.model(filter);
    return count;
  }

  async countAndError(filter: any, errMessage: string = "error, more than one") {
    const count = await this.count(filter);
    if (count > 0) {
      throw new HttpException(errMessage, 500);
    }
    return count;
  }

  async update(id: string, updateDto: UpdateDto, throwErrorIfNotFound: boolean = false, checkBelongToUser: User | null = null) {
    const filter = this.getFilterByIfCheckBelongToUser(id, checkBelongToUser);
    const result = await this.model.findOneAndUpdate(filter, updateDto, {new: true});
    if (!result && throwErrorIfNotFound) {
      throw new HttpException("item not found or do not belong to user", 500);
    }
    return result;
  }

  async remove(id: string, throwErrorIfNotFound: boolean = false, checkBelongToUser: User | null = null) {
    const filter = this.getFilterByIfCheckBelongToUser(id, checkBelongToUser);
    const result = await this.model.findOneAndDelete(filter);
    if (!result && throwErrorIfNotFound) {
      throw new HttpException("item not found or do not belong to user", 500);
    }
    return result;
  }

  createFilterForTime(filter: any) {
    const {from, to} = filter;
    if (from && to) {
      const startTimeFilter = {
        $gte: from,
        $lt: to,
      };
      delete filter["from"];
      delete filter["to"];
      filter["startTime"] = startTimeFilter;
    }
    return filter;
  }

  getFilterByIfCheckBelongToUser(id: string, checkBelongToUser: User | null) {
    const filter = {_id: id};
    if (checkBelongToUser) {
      if (checkBelongToUser.typeNum === ROLE_NUM.ADMIN) {
        return filter;
      }
      filter["userId"] = checkBelongToUser.id;
    }
    return filter;
  }
}
