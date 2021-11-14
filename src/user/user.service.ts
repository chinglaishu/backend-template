import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from "../utils/base/base.service";
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import crypt from 'src/utils/utilsFunction/crypt';
import { UserFilterOption } from 'src/core/filter/filter';
import { FRIEND_STATUS_NUM, ROLE_NUM } from '../constant/constant';
import userHelper from './helper/helper';
import { Friend } from 'src/utils/base/base.entity';
import * as moment from "moment-timezone";
import { ApplicationException } from 'src/core/exception/exception.model';
import { AppErrorCode } from 'src/core/exception/exceptioncode.enum';

@Injectable()
export class UserService extends BaseService<CreateUserDto, UpdateUserDto, UserFilterOption> {
  constructor(
    @InjectModel(User.name) public model: Model<UserDocument>,
  ) {
    super(model);
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password) {
      createUserDto.password = await crypt.hashPassword(createUserDto.password);
    }
    return await this.model.create(createUserDto);
  }

  async checkIsIdOfUser(user: User, id: string) {
    if (user.id !== id && user.roleNum !== ROLE_NUM.ADMIN) {
      throw new HttpException("user do not owne this user id", 500);
    }
    return true;
  }

  async addUserToFriendList(user: User, friendUserId: string) {
    const {friends} = user;
    if (userHelper.checkUserIdInFriendList(friends, friendUserId)) {
      // throw new HttpException("already in friend list", 500);
      return user;
    }
    const friend: Friend = {
      friendId: friendUserId,
      status: FRIEND_STATUS_NUM.normal,
      intimacyLevel: 0,
      startFriendDate: moment().toDate(),
    };
    friends.push(friend);
    return await this.update(user.id, {friends}, true);
  } 

  // not really remove, but change status
  async removeUserFromFriendList(user: User, friendUserId: string) {
    const {friends} = user;
    if (!userHelper.checkUserIdInFriendList(friends, friendUserId)) {return user; }
  }
}
