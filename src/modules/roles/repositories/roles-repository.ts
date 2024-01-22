import { type InsertRole, type Role } from '~/db/schemas';

export interface IRoleRepository {
	insert(data: InsertRole): Promise<Role>;
}
