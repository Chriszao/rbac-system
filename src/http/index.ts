import fastify from 'fastify';
import fastifyGuard from 'fastify-guard';
import jwt from 'jsonwebtoken';

import { type UserRequest } from '~/@types/fastify';
import { env } from '~/config';
import { HttpStatusCode } from '~/shared/errors';
import { logger } from '~/utils';

import { errorHandler } from './error-handling';
import { applicationsRoutes, rolesRoutes, usersRoutes } from './routes';

export async function buildServer() {
	const app = fastify({
		logger,
	});

	app.decorateRequest('user', null);

	app.addHook('onRequest', async (request, reply) => {
		const authHeader = request.headers.authorization;

		if (!authHeader) {
			return reply
				.status(HttpStatusCode.UNAUTHORIZED)
				.send({ error: 'You need to be authenticated' });
		}

		try {
			const token = authHeader.replace('Bearer ', '');

			const decoded = jwt.verify(token, env.JWT_SECRET) as UserRequest;

			request.user = decoded;
		} catch (error) {
			logger.error(error, 'Error on token verification');
		}
	});

	// register plugins
	app.register(fastifyGuard, {
		requestProperty: 'user',
		scopeProperty: 'scopes',
	});

	// register routes
	app.register(applicationsRoutes, { prefix: '/api/applications' });
	app.register(usersRoutes, { prefix: '/api/users' });
	app.register(rolesRoutes, { prefix: '/api/roles' });

	app.setErrorHandler(errorHandler);

	return app;
}
