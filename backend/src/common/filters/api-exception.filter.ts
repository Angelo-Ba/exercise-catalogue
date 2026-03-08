import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

import type { FastifyReply } from 'fastify';
import ErrorMessageDto from '../dto/error-message.dto';
import { ErrorEnum } from '../enum/error.enum';
import ApiExceptionUtil from './api-exception.util';

@Catch(Error)
export class ApiExceptionFilter<
  T extends HttpException | Error,
> implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  private static isDebugEnabled(): boolean {
    return process.env.APP_ENV !== 'prod';
  }

  catch(exception: T, host: ArgumentsHost): FastifyReply {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = ApiExceptionUtil.buildStatus(exception);
    return response
      .status(status)
      .send(this.buildErrorMessageDto(exception, status));
  }

  /**
   * Build the "message" used as code
   * @param exception
   * @returns
   */
  private static buildMessage(
    exception: HttpException | Error,
  ): string | 'suppress_log' {
    if (ApiExceptionUtil.isHttpException(exception)) {
      // Http managed exception
      const httpException = exception.getResponse();
      if (typeof httpException === 'object') {
        // message is the code
        return (httpException as { message: string }).message;
      }
      // inline code
      return httpException;
    }

    // unexpected error - message is the code
    return exception.message;
  }

  private buildErrorMessageDto(
    exception: HttpException | Error,
    statusCode: number,
  ): ErrorMessageDto {
    const status = statusCode >= 400 && statusCode <= 499 ? 'FAIL' : 'ERROR';

    let message: string | 'suppress_log' =
      ApiExceptionFilter.buildMessage(exception);

    if (message === 'suppress_log') {
      // in case of suppress_log then return directly without logging
      return ApiExceptionFilter.isDebugEnabled()
        ? { status, message, debug: exception }
        : { status, message };
    }

    if (!ErrorEnum[message as keyof typeof ErrorEnum]) {
      if (status === 'FAIL') {
        if (statusCode === 401 || statusCode === 403) {
          message = ErrorEnum.INVALID_TOKEN; // se dovessimo implementare login
        } else {
          message = ErrorEnum.INVALID_PARAMETERS;
        }
      } else {
        message = ErrorEnum.GENERIC_SERVER_ERROR;
      }
    }

    if (status === 'FAIL') {
      this.logger.warn(exception, 'message');
    } else {
      this.logger.error(exception, 'message');
    }

    return ApiExceptionFilter.isDebugEnabled()
      ? { status, message, debug: exception }
      : { status, message };
  }
}
