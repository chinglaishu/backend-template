require('dotenv').config();
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PORT } from './constant/config';
import { GLOBALPREFIX } from './constant/constant';
import { AppModule } from './app.module';
import cronHandler from './core/cron/cronHandler';
import { HttpExceptionFilter } from './core/exception/exception.filter';
import { RequestInterceptor } from './core/interceptor/request.interceptor';
import { TransformInterceptor } from './core/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBALPREFIX);
  app.useGlobalFilters(new HttpExceptionFilter);
  app.useGlobalInterceptors(new RequestInterceptor, new TransformInterceptor);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validationError: { target: false, value: false },
    })
  );
  app.enableCors();
  await app.listen(PORT, () => {
    Logger.log('Listening at http://localhost:' + PORT + '/' + GLOBALPREFIX);
  });
}
bootstrap();
