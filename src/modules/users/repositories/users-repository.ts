import { type InsertUserToRole, type InsertUser, type User, type UserToRole } from '~/db/schemas';

export type InsertedUser = Pick<User, 'id' | 'name' | 'email' | 'applicationId'>;

export type GetUserByEmailProps = {
	email: string;
	applicationId: string;
};

export type GetUserByEmailReturn = {
	id: string;
	email: string;
	name: string;
	applicationId: string | null;
	roleId: string | null;
	password: string;
	permissions: string[];
};

export interface IUsersRepository {
	insert(data: InsertUser): Promise<InsertedUser>;
	getByApplicationId(applicationId: string): Promise<User[]>;
	assignRoleToUser(data: InsertUserToRole): Promise<UserToRole>;
	getByEmail(data: GetUserByEmailProps): Promise<GetUserByEmailReturn | null>;
}
