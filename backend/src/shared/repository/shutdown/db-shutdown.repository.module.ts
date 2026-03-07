import { Module, NestModule, OnApplicationShutdown } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import DbShutdownRepository from './db-shutdown.repository';

@Module({
  providers: [DbShutdownRepository],
  exports: [DbShutdownRepository],
})
export default class DbShutdownRepositoryModule
  implements NestModule, OnApplicationShutdown
{
  constructor(
    @InjectDataSource() private readonly ds: DataSource,
    private repository: DbShutdownRepository,
  ) {}

  async onApplicationShutdown(signal?: string) {
    await this.repository.destroy(this.ds, signal);
  }

  configure(): void {}
}
