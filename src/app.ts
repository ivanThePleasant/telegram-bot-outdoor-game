import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from '@/types-di';
import { LOGGER_CONTEXT } from '@/logger';
import type { IConfigService } from '@/config';
import type { ILoggerService } from '@/logger';
import type { BotService } from '@/bot';
import type { ExpressServer } from '@/server';
import type { Database } from '@/database';

@injectable()
export class App {
	constructor(
		@inject(TYPES.BotService) private BotService: BotService,
		@inject(TYPES.ExpressServer) private ExpressServer: ExpressServer,
		@inject(TYPES.IConfigService) private readonly configService: IConfigService,
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
		@inject(TYPES.Database) private database: Database,
	) {}

	public get GetExpressServer() {
		return this.ExpressServer;
	}

	public get GetBotService() {
		return this.BotService;
	}

	public async init() {
		this.logger.log(`[${LOGGER_CONTEXT.appInit}] - Initializing app`);

		// Init Server
		this.logger.log(`[${LOGGER_CONTEXT.serverInit}] - Initializing express server`);
		await this.ExpressServer.initServer();

		// Init DB
		this.logger.log(`[${LOGGER_CONTEXT.dbInit}] - Initializing database service`);
		await this.database.initDb();

		// Init bot
		await this.BotService.init();

		// Complete init
		this.logger.log(`[${LOGGER_CONTEXT.appInit}] - App init complete`);
	}

	// public stop(signal: 'SIGINT' | 'SIGTERM') {
	// 	this.bot.stop(signal);
	// }
}
