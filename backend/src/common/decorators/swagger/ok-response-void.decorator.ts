import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

export function OkResponseVoid() {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          status: { type: 'string', example: 'OK' },
        },
      },
    }),
  );
}
