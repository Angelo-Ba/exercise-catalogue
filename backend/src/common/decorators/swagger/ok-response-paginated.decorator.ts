import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import PaginationDto from 'src/common/dto/pagination.dto';

export function OkResponsePaginated<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(model, PaginationDto),
    ApiOkResponse({
      schema: {
        properties: {
          status: { type: 'string', example: 'OK' },
          data: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              pagination: {
                $ref: getSchemaPath(PaginationDto),
              },
            },
          },
        },
      },
    }),
  );
}
