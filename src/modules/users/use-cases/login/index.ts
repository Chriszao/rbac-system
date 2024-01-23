import { DrizzleUsersRepository } from '~/modules/users/repositories';
import { type FastifyReply, type FastifyRequest } from 'fastify';

import { LoginController } from './controller';
import { type LoginBody } from './schema';

export class LoginUseCase {
	static async handle(request: FastifyRequest<{ Body: LoginBody }>, _: FastifyReply) {
		const data = request.body;

		const usersRepository = new DrizzleUsersRepository();

		const controller = new LoginController(usersRepository);

		return controller.execute(data);
	}
}
