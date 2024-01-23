import { CreateRoleUseCase } from '~/modules/roles/use-cases/create-role';
import { createRoleJsonSchema } from '~/modules/roles/use-cases/create-role/schema';
import { type FastifyInstance } from 'fastify';

export async function rolesRoutes(app: FastifyInstance) {
	app.post('/', { schema: createRoleJsonSchema }, CreateRoleUseCase.handle);
}
