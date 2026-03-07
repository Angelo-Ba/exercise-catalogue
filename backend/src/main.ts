import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

async function bootstrap() {
  const port = Number(process.env.APP_PORT) || 3000;
  const host = process.env.APP_HOST || '0.0.0.0';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  // Logger Pino
  app.useLogger(app.get(Logger));

  // Shutdown hooks
  app.enableShutdownHooks();

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mini Catalogue API')
    .setDescription('Swagger API documentation for Mini Catalogue')
    .setVersion('1.0.0')
    .addCookieAuth('token')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Generate swagger spec JSON if ONLY_SWAGGER_SPEC=true
  if (process.env.ONLY_SWAGGER_SPEC === 'true') {
    writeFileSync(
      `./generated/swagger-spec-${process.env.SDK_CLIENT || 'default'}.json`,
      JSON.stringify(document),
    );
    console.log('swagger-spec generated');
    process.exit(0);
  }

  app.enableCors({
    origin: ['*'],
    credentials: true,
  });

  // Start server
  await app.listen({ port, host });
  console.log(`Backend running on ${host}:${port} }`);

  // Print version
  readFile(`${process.cwd()}/resources/version`, 'utf8')
    .then((data) => console.log(`Version: ${data}`))
    .catch(() => console.log('Version: development mode'));
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
