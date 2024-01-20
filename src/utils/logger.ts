import pino from 'pino';

export const logger = pino({
	redact: ['POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB'],
	level: 'debug',
	transport: {
		target: 'pino-pretty',
	},
});
