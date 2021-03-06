import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { BaseService } from "../utils/base/base.service";
import { Config, ConfigDocument } from './entities/config.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONFIG_TYPE_ENUM, LANGUAGE } from 'src/constant/constant';

@Injectable()
export class ConfigService extends BaseService<ConfigDocument, CreateConfigDto, UpdateConfigDto, any> {
  constructor(
    @InjectModel(Config.name) public model: Model<ConfigDocument>,
  ) {
    super(model);
  }

  async findByLang(typeNum: CONFIG_TYPE_ENUM, lang: LANGUAGE) {
    const config: Config = await this.findOneWithFilter({typeNum}, true);
    const {subject, content, messageMethod} = config;
    return {subject: subject[lang], content: content[lang], messageMethod};
  }
}
