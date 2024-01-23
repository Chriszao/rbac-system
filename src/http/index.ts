import { logger } from '~/utils';
import fastify from 'fastify';

import { errorHandler } from './error-handling';
import { applicationsRoutes, rolesRoutes, usersRoutes } from './routes';

export async function buildServer() {
	const app = fastify({
		logger,
	});

	// register plugins

	// register routes
	app.register(applicationsRoutes, { prefix: '/api/applications' });
	app.register(usersRoutes, { prefix: '/api/users' });
	app.register(rolesRoutes, { prefix: '/api/roles' });

	app.setErrorHandler(errorHandler);

	return app;
}
