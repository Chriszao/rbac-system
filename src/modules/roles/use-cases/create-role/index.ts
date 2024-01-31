import { type FastifyReply, type FastifyRequest } from 'fastify';

import { DrizzleRolesRepository } from '~/modules/roles/repositories';

import { CreateRoleController } from './controller';
import { type CreateRoleBody } from './schema';

export class CreateRoleUseCase {
	static async handle(request: FastifyRequest<{ Body: CreateRoleBody }>, _: FastifyReply) {
		const user = request.user;
		const data = request.body;

		const rolesRepository = new DrizzleRolesRepository();

		const controller = new CreateRoleController(rolesRepository);

		return controller.execute({ ...data, applicationId: user.applicationId });
	}
}
