import { logger } from '~/utils';
import fastify from 'fastify';

import { applicationsRoutes } from './routes';

export async function buildServer() {
	const app = fastify({
		logger,
	});

	// register plugins

	// register routes
	app.register(applicationsRoutes, { prefix: '/api/applications' });

	return app;
}
