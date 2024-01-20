import { logger } from '~/utils';
import fastify from 'fastify';

export async function buildServer() {
	const app = fastify({
		logger,
	});

	return app;
}
