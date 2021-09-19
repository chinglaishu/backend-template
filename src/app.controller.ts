import { Controller, Get } from '@nestjs/common';
import { VERSION_NUM } from './constant/config';
import { AppService } from './app.service';
import { Public } from './core/decorator/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get("health")
  healthCheck() {
    return `connect success: version ${VERSION_NUM}`;
  }
}
