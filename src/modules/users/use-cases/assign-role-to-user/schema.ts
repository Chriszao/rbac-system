import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const assignRoleToUserBody = z.object({
	userId: z.string().uuid(),
	roleId: z.string().uuid(),
	applicationId: z.string().uuid(),
});

export type AssignRoleToUserBody = z.infer<typeof assignRoleToUserBody>;

export const assignRoleToUserJsonSchema = {
	body: zodToJsonSchema(assignRoleToUserBody, 'assignRoleToUserBody'),
};
