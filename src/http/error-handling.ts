import { type FastifyReply, type FastifyRequest } from 'fastify';

import { BaseError, HttpStatusCode } from '~/shared/errors';
import { logger } from '~/utils';

export function errorHandler(error: unknown, request: FastifyRequest, reply: FastifyReply) {
	logger.error(error, 'Something went wrong');

	if (error instanceof BaseError) {
		return reply.status(error.statusCode).send({ error: error.name, message: error.message });
	}

	return reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
		error: 'INTERNAL_SERVER_ERROR',
		message: 'Houston, we got a problem!',
	});
}
