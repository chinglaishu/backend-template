import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import utilsFunction from 'src/utils/utilsFunction/utilsFunction';
import { ApplicationException } from './exception.model';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const status = exception instanceof ApplicationException || exception instanceof HttpException
      ? exception.getStatus() : HttpStatus.BAD_REQUEST;
    const message = utilsFunction.tryJsonParse(exception.message);

    const info = utilsFunction.getObjKeyPath(exception, ["response", "message", "0"], null);

    response
      .status(status)
      .json({
        message,
        data: null,
        info,
      });
  }
}