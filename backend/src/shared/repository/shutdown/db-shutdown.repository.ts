import { Injectable, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export default class DbShutdownRepository {
    private readonly logger = new Logger(DbShutdownRepository.name);

    async destroy(ds: DataSource, signal?: string): Promise<void> {
        this.logger.log(`Shutdown signal received: ${signal}`);
        await ds.destroy();
        this.logger.log("Database connection closed");
    }
}
