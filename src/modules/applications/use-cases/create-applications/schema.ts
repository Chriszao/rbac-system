import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const createApplicationSchema = z.object({
	name: z.string({
		required_error: 'name is required',
	}),
});

export type CreateApplicationBody = z.infer<typeof createApplicationSchema>;

export const createApplicationJsonSchema = {
	body: zodToJsonSchema(createApplicationSchema, 'CreateApplicationSchema'),
};
