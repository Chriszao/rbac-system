import { CreateUserUseCase } from '~/modules/users/use-cases/create-user';
import { createUserJsonSchema } from '~/modules/users/use-cases/create-user/schema';
import { type FastifyInstance } from 'fastify';

export async function usersRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{
			schema: createUserJsonSchema,
		},
		CreateUserUseCase.handle,
	);
}
