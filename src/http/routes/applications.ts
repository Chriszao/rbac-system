import { CreateApplicationHandler } from '~/modules/applications/use-cases/create-applications';
import { createApplicationJsonSchema } from '~/modules/applications/use-cases/create-applications/schema';
import { type FastifyInstance } from 'fastify';

export async function applicationsRoutes(app: FastifyInstance) {
	app.post('/', { schema: createApplicationJsonSchema }, CreateApplicationHandler.handle);

	app.get('/', async () => {});
}
