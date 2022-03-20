require('dotenv').config();
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PORT } from './constant/config';
import { GLOBALPREFIX } from './constant/constant';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/exception/exception.filter';
import { RequestInterceptor } from './core/interceptor/request.interceptor';
import { TransformInterceptor } from './core/interceptor/response.interceptor';
import { ValidationError } from 'class-validator';
import { getValidationErrorResponseData } from './core/exception/helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBALPREFIX);
  app.useGlobalFilters(new HttpExceptionFilter);
  app.useGlobalInterceptors(new RequestInterceptor, new TransformInterceptor);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return getValidationErrorResponseData(validationErrors);
      },
      validateCustomDecorators: true,
    })
  );
  app.enableCors();
  await app.listen(PORT, () => {
    Logger.log('Listening at http://localhost:' + PORT + '/' + GLOBALPREFIX);
  });
}
bootstrap();
