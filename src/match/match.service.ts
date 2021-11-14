import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { BaseService } from "../utils/base/base.service";
import { Match, MatchDocument } from './entities/match.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MatchFilterOption } from 'src/core/filter/filter';

@Injectable()
export class MatchService extends BaseService<CreateMatchDto, UpdateMatchDto, MatchFilterOption> {
  constructor(
    @InjectModel(Match.name) public model: Model<MatchDocument>,
  ) {
    super(model);
  }

}
