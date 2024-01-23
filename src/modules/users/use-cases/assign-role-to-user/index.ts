import { DrizzleUsersRepository } from '~/modules/users/repositories';
import { type FastifyReply, type FastifyRequest } from 'fastify';

import { AssignRoleToUserController } from './controller';
import { type AssignRoleToUserBody } from './schema';

export class AssignRoleToUserUseCase {
	static async handle(request: FastifyRequest<{ Body: AssignRoleToUserBody }>, _: FastifyReply) {
		const data = request.body;

		const usersRepository = new DrizzleUsersRepository();

		const controller = new AssignRoleToUserController(usersRepository);

		return controller.execute(data);
	}
}
