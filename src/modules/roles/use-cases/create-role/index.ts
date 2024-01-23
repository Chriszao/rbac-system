import { DrizzleRolesRepository } from '~/modules/roles/repositories';
import { type FastifyReply, type FastifyRequest } from 'fastify';

import { CreateRoleController } from './controller';
import { type CreateRoleBody } from './schema';

export class CreateRoleUseCase {
	static async handle(request: FastifyRequest<{ Body: CreateRoleBody }>, _: FastifyReply) {
		const data = request.body;

		const rolesRepository = new DrizzleRolesRepository();

		const controller = new CreateRoleController(rolesRepository);

		return controller.execute(data);
	}
}
