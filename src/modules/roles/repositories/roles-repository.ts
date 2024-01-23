import { type InsertRole, type Role } from '~/db/schemas';

export interface GetByNameProps {
	name: string;
	applicationId: string;
}

export interface IRoleRepository {
	insert(data: InsertRole): Promise<Role>;
	getByName(data: GetByNameProps): Promise<Role | null>;
}
