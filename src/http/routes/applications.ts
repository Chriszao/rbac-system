import { CreateApplicationUseCase } from '~/modules/applications/use-cases/create-applications';
import { createApplicationJsonSchema } from '~/modules/applications/use-cases/create-applications/schema';
import { GetApplicationUseCase } from '~/modules/applications/use-cases/get-applications';
import { type FastifyInstance } from 'fastify';

export async function applicationsRoutes(app: FastifyInstance) {
	app.post('/', { schema: createApplicationJsonSchema }, CreateApplicationUseCase.handle);

	app.get('/', GetApplicationUseCase.handle);
}
