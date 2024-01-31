import { type FastifyReply, type FastifyRequest } from 'fastify';

import { DrizzleApplicationsRepository } from '~/modules/applications/repositories';

import { GetApplicationsController } from './controller';

export class GetApplicationUseCase {
	static handle(_request: FastifyRequest, _: FastifyReply) {
		const applicationsRepository = new DrizzleApplicationsRepository();

		const controller = new GetApplicationsController(applicationsRepository);

		return controller.handle();
	}
}
