import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from "../utils/base/base.service";
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import crypt from 'src/utils/utilsFunction/crypt';
import { UserFilterOption } from 'src/core/filter/filter';
import { ROLE_NUM } from '../constant/constant';

@Injectable()
export class UserService extends BaseService<CreateUserDto, UpdateUserDto, UserFilterOption> {
  constructor(
    @InjectModel(User.name) public model: Model<UserDocument>,
  ) {
    super(model);
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await crypt.hashPassword(createUserDto.password);
    return await this.model.create(createUserDto);
  }

  async checkIsIdOfUser(user: User, id: string) {
    if (user.id !== id && user.roleNum !== ROLE_NUM.ADMIN) {
      throw new HttpException("user do not owne this user id", 500);
    }
    return true;
  }
}
