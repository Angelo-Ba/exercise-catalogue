import { Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ApiExceptionFilter } from './filters/api-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true, // rimuove proprietà non previste nei DTO
          transform: true, // converte query string
          transformOptions: {
            enableImplicitConversion: true,
          },
        });
      },
    },

    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export default class CommonModule implements NestModule {
  configure(): void {}
}
