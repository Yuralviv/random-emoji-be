import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { time } from 'console';
import { response } from 'express';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException ? exception.getStatus() : 500;

    response.status(statusCode);
    response.json({
      statusCode,
      message: isHttpException ? exception['message'] : 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
