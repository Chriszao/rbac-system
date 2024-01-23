import { logger } from '~/utils';
import fastify from 'fastify';

import { errorHandler } from './error-handling';
import { applicationsRoutes } from './routes';
import { usersRoutes } from './routes/users';

export async function buildServer() {
	const app = fastify({
		logger,
	});

	// register plugins

	// register routes
	app.register(applicationsRoutes, { prefix: '/api/applications' });
	app.register(usersRoutes, { prefix: '/api/users' });

	app.setErrorHandler(errorHandler);

	return app;
}
