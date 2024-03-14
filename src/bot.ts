import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from './types-di';
import { Telegraf, session } from 'telegraf';
import { IConfigService } from './config';
import { ILoggerService, LOGGER_CONTEXT } from './logger';
import { IBotContext } from '@/context/context.interface';
import { Command } from './commands/command.class';
import { StartCommand } from './commands/start.command';

@injectable()
export class Bot {
	bot: Telegraf<IBotContext>;
	commands: Command[] = [];

	constructor(
		@inject(TYPES.IConfigService) private readonly configService: IConfigService,
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
	) {
		this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
		this.bot.use(session());
	}

	public init() {
		this.logger.log(`[${LOGGER_CONTEXT.botInit}] - Initializing bot and services`);
    this.logger.log(`[${LOGGER_CONTEXT.botInit}] - Registerring bot commands`);
    this.commands = [new StartCommand(this.bot)]
		for (const command of this.commands) {
			command.handle();
		}
		this.bot.launch();
    this.logger.log(`[${LOGGER_CONTEXT.botInit}] - Setting commands menu via API`);
    
		this.logger.log(`[${LOGGER_CONTEXT.botInit}] - Bot init complete`);
	}

  public stop(signal: 'SIGINT' | 'SIGTERM') {
    this.bot.stop(signal)
  }
}
