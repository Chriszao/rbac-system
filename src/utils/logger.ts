import pino from 'pino';

export const logger = pino({
	redact: ['DATABASE_URL', 'JWT_SECRET'],
	level: 'debug',
	transport: {
		target: 'pino-pretty',
	},
});
