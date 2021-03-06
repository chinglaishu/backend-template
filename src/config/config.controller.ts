import { Controller } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { BaseController } from 'src/utils/base/base.controller';
import { Public } from 'src/core/decorator/public.decorator';
import { ConfigDocument } from './entities/config.entity';

@Controller('config')
export class ConfigController extends BaseController<ConfigDocument, CreateConfigDto, UpdateConfigDto, any> {

  constructor(
    public service: ConfigService,
  ) {
    super(service);
  }

}
