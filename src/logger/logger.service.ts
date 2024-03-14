import 'reflect-metadata'
import { injectable } from 'inversify';
import { createLogger, transports, format, Logger } from 'winston'
import { ILoggerService } from './logger.interface';

@injectable()
export class LoggerService implements ILoggerService {
  public logger: Logger

  constructor() {
    this.logger = createLogger({
      transports: [new transports.Console()],
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      )
    })
  }

  log(message: string) {
    this.logger.log({ level: 'info', message });
  }

  warn(message: string) {
    this.logger.log({ level: 'warn', message });
  }

  error(message: string) {
    this.logger.log({ level: 'error', message });
  }

}