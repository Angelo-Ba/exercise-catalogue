import type { HttpException } from '@nestjs/common';

export default class ApiExceptionUtil {
  public static isHttpException(
    exception: HttpException | Error,
  ): exception is HttpException {
    return (
      typeof (exception as HttpException).getStatus === 'function' &&
      typeof (exception as HttpException).getResponse === 'function'
    );
  }

  public static buildStatus(exception: HttpException | Error): number {
    return ApiExceptionUtil.isHttpException(exception)
      ? exception.getStatus()
      : 500;
  }
}
