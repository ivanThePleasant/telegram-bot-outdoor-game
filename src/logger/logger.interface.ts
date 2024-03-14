export interface ILoggerService {
	logger: unknown;
	log: (message: string) => void;
	warn: (message: string) => void;
	error: (message: string) => void;
}
