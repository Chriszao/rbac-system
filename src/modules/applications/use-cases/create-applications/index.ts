import { DrizzleApplicationsRepository } from '~/modules/applications/repositories';
import { DrizzleRolesRepository } from '~/modules/roles/repositories';
import { type FastifyReply, type FastifyRequest } from 'fastify';

import { CreateApplicationsController } from './controller';
import { type CreateApplicationBody } from './schema';

export class CreateApplicationHandler {
	static handle(request: FastifyRequest<{ Body: CreateApplicationBody }>, _: FastifyReply) {
		const { name } = request.body;

		const applicationsRepository = new DrizzleApplicationsRepository();
		const rolesRepository = new DrizzleRolesRepository();

		const controller = new CreateApplicationsController(applicationsRepository, rolesRepository);

		return controller.handle({ name });
	}
}
