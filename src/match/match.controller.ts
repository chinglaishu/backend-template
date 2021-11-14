import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { BaseController } from 'src/utils/base/base.controller';
import { MatchFilterOption } from 'src/core/filter/filter';
import { ReqUser } from 'src/core/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Lang } from 'src/core/decorator/lang.decorator';
import { LANGUAGE, MATCH_STATUS_NUM, ROLE_NUM } from 'src/constant/constant';
import { UserService } from 'src/user/user.service';
import { Match } from './entities/match.entity';

@Controller('match')
export class MatchController extends BaseController<CreateMatchDto, UpdateMatchDto, MatchFilterOption> {

  constructor(
    public service: MatchService,
    public userService: UserService,
  ) {
    super(service);
  }

  @Post()
  async create(@ReqUser() user: User, @Body() createMatchDto: CreateMatchDto, @Lang() lang: LANGUAGE) {
    if (user.roleNum !== ROLE_NUM.ADMIN || !createMatchDto.fromUserId) {
      createMatchDto.fromUserId = user.id;
    }
    const {fromUserId, toUserId} = createMatchDto;
    await this.service.countAndError({fromUserId, toUserId});
    return this.service.create(createMatchDto);
  }

  @Put(':id')
  async update(@ReqUser() user: User, @Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto, @Lang() lang: LANGUAGE) {
    const {status} = updateMatchDto;
    const match: Match = await this.service.findOne(id, true, user);
    const {fromUserId, toUserId} = match;
    if (status === MATCH_STATUS_NUM.ACCEPTED) {
      const fromUser = await this.userService.findOne(fromUserId, true);
      const toUser = await this.userService.findOne(toUserId, true);
      await this.userService.addUserToFriendList(fromUser, toUserId);
      await this.userService.addUserToFriendList(toUser, fromUserId);
    }
    return await this.service.update(id, updateMatchDto, true, user);
  }
}
