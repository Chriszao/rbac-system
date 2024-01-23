import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const createUserBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	applicationId: z.string().uuid(),
	password: z.string().min(6),
	initialUser: z.boolean().optional(),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;

export const createUserJsonSchema = {
	body: zodToJsonSchema(createUserBodySchema, 'createUserBodySchema'),
};
