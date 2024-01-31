import { type FastifyInstance } from 'fastify';

import { PERMISSIONS } from '~/config/permissions';
import { AssignRoleToUserUseCase } from '~/modules/users/use-cases/assign-role-to-user';
import {
	type AssignRoleToUserBody,
	assignRoleToUserJsonSchema,
} from '~/modules/users/use-cases/assign-role-to-user/schema';
import { CreateUserUseCase } from '~/modules/users/use-cases/create-user';
import { createUserJsonSchema } from '~/modules/users/use-cases/create-user/schema';
import { LoginUseCase } from '~/modules/users/use-cases/login';
import { loginJsonSchema } from '~/modules/users/use-cases/login/schema';

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

	app.post<{ Body: AssignRoleToUserBody }>(
		'/roles',
		{
			schema: assignRoleToUserJsonSchema,
			preHandler: [app.guard.scope(PERMISSIONS['users:roles:write'])],
		},
		AssignRoleToUserUseCase.handle,
	);
}
