import { db } from '~/db';
import { applications, type Application, type InsertApplication } from '~/db/schemas';
import {
	type ApplicationWithoutUpdatedAt,
	type IApplicationRepository,
} from '~/modules/applications/repositories/applications-repository';

export class DrizzleApplicationsRepository implements IApplicationRepository {
	async fetch(): Promise<ApplicationWithoutUpdatedAt[]> {
		const result = await db
			.select({
				id: applications.id,
				name: applications.name,
				createdAt: applications.createdAt,
			})
			.from(applications);

		return result;
	}

	async insert(data: InsertApplication): Promise<Application> {
		const result = await db.insert(applications).values(data).returning();

		return result[0];
	}
}
