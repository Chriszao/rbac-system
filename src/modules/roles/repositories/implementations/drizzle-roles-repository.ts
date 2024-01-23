import { db } from '~/db';
import { roles, type InsertRole, type Role } from '~/db/schemas';
import { and, eq } from 'drizzle-orm';

import { type GetByNameProps, type IRoleRepository } from '../roles-repository';

export class DrizzleRolesRepository implements IRoleRepository {
	async getByName({ applicationId, name }: GetByNameProps): Promise<Role | null> {
		const whereCondition = and(eq(roles.name, name), eq(roles.applicationId, applicationId));

		const result = await db.select().from(roles).where(whereCondition).limit(1);

		return result[0] ?? null;
	}

	async insert(data: InsertRole): Promise<Role> {
		const result = await db.insert(roles).values(data).returning();

		return result[0];
	}
}
