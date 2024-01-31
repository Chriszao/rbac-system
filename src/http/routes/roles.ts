import { type FastifyInstance } from 'fastify';

import { PERMISSIONS } from '~/config/permissions';
import { CreateRoleUseCase } from '~/modules/roles/use-cases/create-role';
import {
	type CreateRoleBody,
	createRoleJsonSchema,
} from '~/modules/roles/use-cases/create-role/schema';

export async function rolesRoutes(app: FastifyInstance) {
	app.post<{ Body: CreateRoleBody }>(
		'/',
		{ schema: createRoleJsonSchema, preHandler: [app.guard.scope(PERMISSIONS['roles:write'])] },
		CreateRoleUseCase.handle,
	);
}
