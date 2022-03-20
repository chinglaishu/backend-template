import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import utilsFunction from 'src/utils/utilsFunction/utilsFunction';
import { ApplicationException } from './exception.model';
import { UseError } from './exceptioncode.enum';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const status = exception instanceof ApplicationException || exception instanceof HttpException
      ? exception.getStatus() : HttpStatus.BAD_REQUEST;
    const message = utilsFunction.tryJsonParse(exception.message);

    const defaultError = UseError.UNKNOWN_ERROR;
    const data = exception instanceof ApplicationException ? exception.getData() : null;

    response
      .status(status)
      .json({
        code: exception instanceof ApplicationException ? exception.getErrorCode() :defaultError.code,
        message,
        data,
      });
  }
}