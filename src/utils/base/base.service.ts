import { HttpException, Injectable } from '@nestjs/common';
import { ROLE_NUM, USER_ID_FIELD } from '../../constant/constant';
import { User } from 'src/user/entities/user.entity';
import utilsFunction from '../utilsFunction/utilsFunction';
import { PaginationEntity } from "./base.entity";
import { BaseFilterOption } from 'src/core/filter/filter';
import * as moment from 'moment-timezone';

export class BaseService<CreateDto, UpdateDto, FilterOption extends BaseFilterOption> {
  constructor(
    public model: any,
    public createAddUserId: boolean = false,
    public populates: string[] = [],
  ) {}

  async create(createDto: CreateDto, user?: User) {
    if (this.createAddUserId && !user) {
      throw new HttpException("no user in create", 500);
    }

    if (this.createAddUserId && user) {
      createDto = utilsFunction.checkIfAddUserId(USER_ID_FIELD, user, createDto);
    }
    const result = await this.model.create(createDto);
    return await this.populateExec(result);
  }

  // if only admin can get all and filter do not have a userId then userId will add to the filter
  async findAll(filter: FilterOption, page: number, pageSize: number, checkIfAddUserIdByUser: User | null = null, sort: any = {}) {
    filter = utilsFunction.checkIfAddUserId(USER_ID_FIELD, checkIfAddUserIdByUser, filter);
  
    let totalCount, data;

    filter = this.createFilterForTime(filter);

    totalCount = await this.model.count(filter);

    data = await this.model.find(filter).sort(sort).skip((page - 1) * pageSize).limit(+pageSize).exec();

    if (Object.keys(sort).length === 0) {
      data.sort((a: any, b: any) => a.index - b.index);
    }

    const result = new PaginationEntity();
    result.data = await this.populateExecList(data);
    result.page = page;
    result.pageSize = pageSize;
    result.totalPage = Math.ceil(totalCount/pageSize);
    return result;
  }

  async findAllWithoutPagination(filter: FilterOption, checkIfAddUserIdByUser: User | null = null, sort: any = {}) {
    filter = utilsFunction.checkIfAddUserId(USER_ID_FIELD, checkIfAddUserIdByUser, filter);
    filter = this.createFilterForTime(filter);

    const data = await this.model.find(filter).sort(sort);

    if (Object.keys(sort).length === 0) {
      data.sort((a: any, b: any) => a.index - b.index);
    }

    return await this.populateExecList(data);
  }

  async findAllWithoutFilter() {
    const result = await this.model.find();
    return await this.populateExec(result);
  }

  async findOne(id: string, throwErrorIfNotFound: boolean = false, checkBelongToUser: User | null = null) {
    const filter = this.getFilterByIfCheckBelongToUser(id, checkBelongToUser);
    const result = await this.model.findOne(filter);
    if (!result && throwErrorIfNotFound) {
      throw new HttpException("item not found or do not belong to user", 500);
    }
    return await this.populateExec(result);
  }

  async findOneWithFilter(filter: FilterOption, checkIfAddUserIdByUser: User | null = null, throwErrorIfNotFound: boolean = false) {
    filter = utilsFunction.checkIfAddUserId(USER_ID_FIELD, checkIfAddUserIdByUser, filter);
    const result = await this.model.findOne(filter);
    if (!result && throwErrorIfNotFound) {
      throw new HttpException("item not found", 500);
    }
    return await this.populateExec(result);
  }

  async count(filter: FilterOption) {
    const count = await this.model.count(filter);
    return count;
  }

  async countAndError(filter: FilterOption, errMessage: string = "error, more than one") {
    const count = await this.count(filter);
    if (count > 0) {
      throw new HttpException(errMessage, 500);
    }
    return count;
  }

  async update(id: string, updateDto: UpdateDto, throwErrorIfNotFound: boolean = false, checkBelongToUser: User | null = null) {
    const filter = this.getFilterByIfCheckBelongToUser(id, checkBelongToUser);
    const result = await this.model.findOneAndUpdate(filter, {...updateDto, updatedAt: moment().toDate()}, {new: true});
    if (!result && throwErrorIfNotFound) {
      throw new HttpException("item not found or do not belong to user", 500);
    }
    return await this.populateExec(result);
  }

  async remove(id: string, throwErrorIfNotFound: boolean = false, checkBelongToUser: User | null = null) {
    const filter = this.getFilterByIfCheckBelongToUser(id, checkBelongToUser);
    const result = await this.model.findOneAndDelete(filter);
    if (!result && throwErrorIfNotFound) {
      throw new HttpException("item not found or do not belong to user", 500);
    }
    return await this.populateExec(result);
  }

  async getRandom(size: number, filter?: FilterOption) {
    // const results = await this.model.find({...filter}).aggregate([{$sample: {size}}]);
    const results = await this.model.find({...filter}).limit(size);
    return results;
  }

  async getRandomOne(filter?: FilterOption) {
    // const results = await this.model.find({...filter}).aggregate([{$sample: {size: 1}}]);
    const results = await this.model.find({...filter}).limit(1);
    return results.length > 0 ? results[0] : null;
  }

  createFilterForTime(filter: FilterOption) {
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
      if (checkBelongToUser.role === ROLE_NUM.ADMIN) {
        return filter;
      }
      filter[USER_ID_FIELD] = checkBelongToUser.id;
    }
    return filter;
  }

  async populateExecList(results: any) {
    for (let i = 0 ; i < results.length ; i++) {
      for (let a = 0 ; a < this.populates.length ; a++) {
        results[i] = await results[i].populate(this.populates[a]).execPopulate();
      }
    }
    return results;
  }

  async populateExec(result: any) {
    if (!result) {return null; }
    for (let i = 0 ; i < this.populates.length ; i++) {

      result = await result.populate(this.populates[i]).execPopulate();
    }
    return result;
  }
}
