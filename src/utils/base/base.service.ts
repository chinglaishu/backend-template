import { HttpException } from '@nestjs/common';
import { ROLE_ENUM, USER_ID_FIELD } from '../../constant/constant';
import { User } from 'src/user/entities/user.entity';
import utilsFunction from '../utilsFunction/utilsFunction';
import { BaseEntity, PaginationEntity } from "./base.entity";
import { BaseFilterOption } from 'src/core/filter/filter';
import * as moment from 'moment-timezone';
import { Model, Document } from 'mongoose';
import { ApplicationException } from 'src/core/exception/exception.model';
import { ErrorResponseData, UseError } from 'src/core/exception/exceptioncode.enum';

export class BaseService<UseDocument extends Document<BaseEntity>, CreateDto, UpdateDto, FilterOption> {
  constructor(
    public model: Model<UseDocument>,
    public populates: string[] = [],
  ) {}

  async create(createDto: CreateDto) {
    const result = await this.model.create(createDto);
    return await this.populateExec(result);
  }

  async findAll(filter: FilterOption, page: number, pageSize: number, sort: any = {}) {
    const totalCount = await this.model.count(filter);
    let data: UseDocument[] = await this.model.find(filter).sort(sort).skip((page - 1) * pageSize).limit(+pageSize).exec();
    data = await this.populateExecList(data);
    const totalPage = Math.ceil(totalCount/pageSize);
    const result = new PaginationEntity<UseDocument>(totalPage, data, page, pageSize);
    return result;
  }

  async findAllWithoutPagination(filter: FilterOption, sort: any = {}) {
    const data = await this.model.find(filter).sort(sort);
    return await this.populateExecList(data);
  }

  async findOneById(id: string, throwErrorIfNotFound: boolean = false) {
    const filter: BaseFilterOption = {_id: id};
    const result = await this.model.findOne(filter);
    this.checkThrowErroIfNotFound(result, throwErrorIfNotFound);
    return await this.populateExec(result);
  }

  async findOneWithFilter(filter: FilterOption, throwErrorIfNotFound: boolean = false) {
    const result = await this.model.findOne(filter);
    this.checkThrowErroIfNotFound(result, throwErrorIfNotFound);
    return await this.populateExec(result);
  }

  async count(filter: FilterOption, errResponseData: ErrorResponseData | null = UseError.ITEM_REPEATED) {
    const count = await this.count(filter);
    if (count > 0 && errResponseData) {
      throw new ApplicationException(errResponseData);
    }
    return count;
  }

  async updateOneById(id: string, updateDto: UpdateDto, throwErrorIfNotFound: boolean = false) {
    const filter: BaseFilterOption = {_id: id};
    const result = await this.model.findOneAndUpdate(filter, {...updateDto, updatedAt: moment().toDate()}, {new: true});
    this.checkThrowErroIfNotFound(result, throwErrorIfNotFound);
    return await this.populateExec(result);
  }

  async updateOneWithFilter(filter: FilterOption, updateDto: UpdateDto, throwErrorIfNotFound: boolean = false) {
    const result = await this.model.findOneAndUpdate(filter, {...updateDto, updatedAt: moment().toDate()}, {new: true});
    this.checkThrowErroIfNotFound(result, throwErrorIfNotFound);
    return await this.populateExec(result);
  }

  async removeOneById(id: string, throwErrorIfNotFound: boolean = false) {
    const filter: BaseFilterOption = {_id: id};
    const result = await this.model.findOneAndDelete(filter);
    this.checkThrowErroIfNotFound(result, throwErrorIfNotFound);
    return await this.populateExec(result);
  }

  async removeOneWithFilter(filter: FilterOption, throwErrorIfNotFound: boolean = false) {
    const result = await this.model.findOneAndDelete(filter);
    this.checkThrowErroIfNotFound(result, throwErrorIfNotFound);
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

  checkThrowErroIfNotFound(result: UseDocument, isCheck: boolean) {
    if (result || !isCheck) {return; }
    throw new ApplicationException(UseError.ITEM_NOT_FOUND_OR_NO_ACCESS);
  }

  async populateExecList(results: UseDocument[]) {
    for (let i = 0 ; i < results.length ; i++) {
      if (!results[i]) {continue; }
      for (let a = 0 ; a < this.populates.length ; a++) {
        results[i] = await results[i].populate(this.populates[a]).execPopulate();
      }
    }
    return results;
  }

  async populateExec(result: UseDocument) {
    if (!result) {return null; }
    for (let i = 0 ; i < this.populates.length ; i++) {

      result = await result.populate(this.populates[i]).execPopulate();
    }
    return result;
  }
}
