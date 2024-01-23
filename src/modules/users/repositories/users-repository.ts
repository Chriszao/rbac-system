import { type InsertUserToRole, type InsertUser, type User, type UserToRole } from '~/db/schemas';

export type InsertedUser = Pick<User, 'id' | 'name' | 'email' | 'applicationId'>;

export interface IUsersRepository {
	insert(data: InsertUser): Promise<InsertedUser>;
	getByApplicationId(applicationId: string): Promise<User[]>;
	assignRoleToUser(data: InsertUserToRole): Promise<UserToRole>;
}
