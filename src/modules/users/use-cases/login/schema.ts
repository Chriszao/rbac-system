import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const LoginBodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	applicationId: z.string().uuid(),
});

export type LoginBody = z.infer<typeof LoginBodySchema>;

export const loginJsonSchema = {
	body: zodToJsonSchema(LoginBodySchema, 'loginJsonSchema'),
};
