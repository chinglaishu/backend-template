import { Logger, Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class RequestInterceptor implements NestInterceptor {

  private readonly logger = new Logger(RequestInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()

    this.logger.log(`Received {${request.method}: ${request.path}}`)

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Processed {${request.method}: ${request.path}} - ${Date.now() - now}ms`)),
      );
  }
}