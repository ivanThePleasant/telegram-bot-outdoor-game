import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types-di';
import { Bot } from './bot';
import { IConfigService, ConfigService } from './config';
import { ILoggerService, LoggerService } from './logger';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
	bind<Bot>(TYPES.Bot).to(Bot);
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const bot = appContainer.get<Bot>(TYPES.Bot);
	bot.init();

	return { bot, appContainer };
}

export const { bot, appContainer } = bootstrap();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
