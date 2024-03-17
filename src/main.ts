import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from '@/types-di';
import { App } from '@/app';
import { ExpressServer } from '@/server';
import { BotService } from '@/bot';
import { IConfigService, ConfigService } from '@/config';
import { ILoggerService, LoggerService } from '@/logger';
import { Database } from '@/database';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
	bind<App>(TYPES.App).to(App).inSingletonScope();
	bind<BotService>(TYPES.BotService).to(BotService).inSingletonScope();
	bind<ExpressServer>(TYPES.ExpressServer).to(ExpressServer).inSingletonScope();
  bind<Database>(TYPES.Database).to(Database).inSingletonScope();
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.App);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();

// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
