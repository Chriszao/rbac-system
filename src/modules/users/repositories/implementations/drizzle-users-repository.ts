import { db } from '~/db';
import {
	users,
	usersToRoles,
	type InsertUser,
	type InsertUserToRole,
	type User,
	type UserToRole,
	roles,
} from '~/db/schemas';
import {
	type GetUserByEmailReturn,
	type GetUserByEmailProps,
	type IUsersRepository,
	type InsertedUser,
} from '~/modules/users/repositories';
import argon2 from 'argon2';
import { and, eq } from 'drizzle-orm';

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

	async getByEmail({
		applicationId,
		email,
	}: GetUserByEmailProps): Promise<GetUserByEmailReturn | null> {
		const result = await db
			.select({
				id: users.id,
				email: users.email,
				name: users.name,
				applicationId: users.applicationId,
				roleId: roles.id,
				password: users.password,
				permissions: roles.permissions,
			})
			.from(users)
			.where(and(eq(users.email, email), eq(users.applicationId, applicationId)))
			.leftJoin(
				usersToRoles,
				and(eq(usersToRoles.userId, users.id), eq(usersToRoles.applicationId, users.applicationId)),
			)
			.leftJoin(roles, eq(roles.id, usersToRoles.roleId));

		const user = result.reduce(
			(acc, current) => {
				if (!acc.id) {
					return {
						...current,
						permissions: new Set(current.permissions),
					};
				}

				if (!current.permissions) {
					return acc;
				}

				for (const permission of current.permissions) {
					acc.permissions.add(permission);
				}

				return acc;
			},
			{} as Omit<GetUserByEmailReturn, 'permissions'> & { permissions: Set<string> },
		);

		return result.length > 0
			? {
					...user,
					permissions: Array.from(user.permissions),
				}
			: null;
	}
}
