import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from "../utils/base/base.service";
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFilterOption } from 'src/core/filter/filter';

@Injectable()
export class UserService extends BaseService<UserDocument, CreateUserDto, UpdateUserDto, UserFilterOption> {
  constructor(
    @InjectModel(User.name) public model: Model<UserDocument>,
  ) {
    super(model);
  }

}
