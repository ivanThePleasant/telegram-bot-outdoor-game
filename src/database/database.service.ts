import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import mongoose, { Mongoose } from 'mongoose';
import { TYPES } from '@/types-di';
import type { IConfigService } from '@/config';
import type { ILoggerService } from '@/logger';
import { LOGGER_CONTEXT } from '@/logger';

@injectable()
export class Database {
	client: Mongoose;
	private connectionString: string;

	constructor(
    @inject(TYPES.IConfigService) private readonly configService: IConfigService,
    @inject(TYPES.ILoggerService) private logger: ILoggerService
  ) {
		this.client = mongoose;
    this.connectionString = this.configService.get('DB_CONNECTION')
	}

  public async initDb() {
      try {
        await this.client.connect(this.connectionString)
      } catch (error) {
        this.logger.error(`[${LOGGER_CONTEXT.dbInit}] - Failed to connect to the database`)
        throw new Error(String(error))
      }
  }
}
