import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import DbShutdownRepositoryModule from './shared/repository/shutdown/db-shutdown.repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [
        `${process.cwd()}/env/${process.env.APP_ENV || 'local'}.env`,
        `${process.cwd()}/env/default.env`,
      ],
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'debug',
        redact: ['request.headers.authorization'],
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              options: {
                colorize: [undefined, 'local', 'docker'].includes(
                  process.env.APP_ENV,
                ),
                singleLine: true,
                levelFirst: false,
                translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
                messageFormat:
                  '[{req.headers.x-correlation-id}] [{context}] {msg}',
                ignore: 'pid,hostname,context,req,res,responseTime',
                errorLikeObjectKeys: ['err', 'error'],
              },
              level: process.env.LOG_LEVEL || 'debug',
            },
          ],
        },
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const type = configService.getOrThrow<string>('DATABASE_TYPE');
        const host = configService.getOrThrow<string>('DATABASE_HOST');
        const port = +configService.getOrThrow<string>('DATABASE_PORT');
        const username = configService.getOrThrow<string>('DATABASE_USERNAME');
        const password = configService.getOrThrow<string>('DATABASE_PASSWORD');
        const database = configService.getOrThrow<string>('DATABASE_NAME');
        /**
         * If true autocreate database schema and database migrations are not required
         */
        const dbSynchronize = configService.getOrThrow<string>('DATABASE_SYNC');

        const dbMigrations = configService.getOrThrow<string>(
          'DATABASE_MIGRATIONS',
        );
        return {
          type,
          host,
          port,
          username,
          password,
          database,
          entities: [],
          migrations: [`${process.cwd()}/dist/migrations/*.js`],
          migrationsRun: dbMigrations === 'true',
          synchronize: dbSynchronize === 'true',
          manualInitialization: process.env.ONLY_SWAGGER_SPEC === 'true',
          logging: true,
        } as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),

    DbShutdownRepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
