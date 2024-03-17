import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import express, { Express } from 'express';
import { json } from 'body-parser';
import { Server } from 'http';
import { TYPES } from '../types-di';
import { IConfigService } from '../config';
import { ILoggerService, LOGGER_CONTEXT } from '../logger';

@injectable()
export class ExpressServer {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.IConfigService) private readonly configService: IConfigService,
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
	) {
		this.app = express();
		const envPort = this.configService.get('PORT');
		if (typeof envPort === 'number') {
			this.port = envPort;
		} else {
			this.port = Number(envPort);
		}
	}

	useMiddleware() {
		this.app.use(json());
	}

	useRoutes() {
		// this.app.use(routes.batch, this.queueController.router);
	}

	useExceptionFilters() {
		// this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async initServer() {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`[${LOGGER_CONTEXT.serverInit}] - Server is listening on http://localhost:${this.port}`);
	}
}
