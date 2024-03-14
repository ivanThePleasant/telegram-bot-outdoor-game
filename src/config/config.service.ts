import 'reflect-metadata';
import { injectable } from 'inversify';
import { config, DotenvParseOutput } from 'dotenv';
import { IConfigService } from '@config/config.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor() {
		const { error, parsed } = config();
		if (error || !parsed) {
			throw new Error("An issue occured with '.env' file, it is either empty or missing.");
		}

		this.config = parsed;
	}

	get(key: string): string {
		const res = this.config[key];
		if (!res) {
			throw new Error(`An issue occured with parsing requested key, no such key (${key}) found`);
		}

		return res;
	}
}
