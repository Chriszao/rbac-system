import { AssignRoleToUserUseCase } from '~/modules/users/use-cases/assign-role-to-user';
import { assignRoleToUserJsonSchema } from '~/modules/users/use-cases/assign-role-to-user/schema';
import { CreateUserUseCase } from '~/modules/users/use-cases/create-user';
import { createUserJsonSchema } from '~/modules/users/use-cases/create-user/schema';
import { LoginUseCase } from '~/modules/users/use-cases/login';
import { loginJsonSchema } from '~/modules/users/use-cases/login/schema';
import { type FastifyInstance } from 'fastify';

export async function usersRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{
			schema: createUserJsonSchema,
		},
		CreateUserUseCase.handle,
	);

	app.post(
		'/login',
		{
			schema: loginJsonSchema,
		},
		LoginUseCase.handle,
	);

	app.post(
		'/roles',
		{
			schema: assignRoleToUserJsonSchema,
		},
		AssignRoleToUserUseCase.handle,
	);
}
