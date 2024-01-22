import { db } from '~/db';
import { roles, type InsertRole, type Role } from '~/db/schemas';

import { type IRoleRepository } from '../roles-repository';

export class DrizzleRolesRepository implements IRoleRepository {
	async insert(data: InsertRole): Promise<Role> {
		const result = await db.insert(roles).values(data).returning();

		return result[0];
	}
}
