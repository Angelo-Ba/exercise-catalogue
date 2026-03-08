import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function OkResponse<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          status: { type: 'string', example: 'OK' },
          data: { $ref: getSchemaPath(model) },
        },
        required: ['status', 'data'],
      },
    }),
  );
}
