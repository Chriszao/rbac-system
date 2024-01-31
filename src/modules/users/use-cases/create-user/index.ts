import { type FastifyReply, type FastifyRequest } from 'fastify';

import { DrizzleRolesRepository } from '~/modules/roles/repositories';
import { DrizzleUsersRepository } from '~/modules/users/repositories';

import { CreateUserController } from './controller';
import { type CreateUserBody } from './schema';

export class CreateUserUseCase {
	static handle(request: FastifyRequest<{ Body: CreateUserBody }>, _: FastifyReply) {
		const data = request.body;

		const usersRepository = new DrizzleUsersRepository();
		const rolesRepository = new DrizzleRolesRepository();

		const controller = new CreateUserController(usersRepository, rolesRepository);

		return controller.handle(data);
	}
}
