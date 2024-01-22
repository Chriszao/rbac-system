import { type Application, type InsertApplication } from '~/db/schemas';

export type ApplicationWithoutUpdatedAt = Omit<Application, 'updatedAt'>;

export interface IApplicationRepository {
	insert(data: InsertApplication): Promise<Application>;
	fetch(): Promise<ApplicationWithoutUpdatedAt[]>;
}
