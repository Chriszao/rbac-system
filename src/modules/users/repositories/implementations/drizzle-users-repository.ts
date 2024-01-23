import { db } from '~/db';
import {
	users,
	type InsertUser,
	type User,
	type InsertUserToRole,
	usersToRoles,
	type UserToRole,
} from '~/db/schemas';
import { type IUsersRepository, type InsertedUser } from '~/modules/users/repositories';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';

export class DrizzleUsersRepository implements IUsersRepository {
	async insert(data: InsertUser): Promise<InsertedUser> {
		const hashedPassword = await argon2.hash(data.password);

		const result = await db
			.insert(users)
			.values({
				...data,
				password: hashedPassword,
			})
			.returning({
				id: users.id,
				name: users.name,
				email: users.email,
				applicationId: users.applicationId,
			});

		return result[0];
	}

	async getByApplicationId(applicationId: string): Promise<User[]> {
		const result = await db.select().from(users).where(eq(users.applicationId, applicationId));

		return result;
	}

	async assignRoleToUser(data: InsertUserToRole): Promise<UserToRole> {
		const result = await db.insert(usersToRoles).values(data).returning();

		return result[0];
	}
}
