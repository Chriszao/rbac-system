import { ALL_PERMISSIONS, SYSTEM_ROLES, USER_ROLE_PERMISSIONS } from '~/config/permissions';
import { type InsertApplication } from '~/db/schemas';
import { type IApplicationRepository } from '~/modules/applications/repositories';
import { type IRoleRepository } from '~/modules/roles/repositories';

export class CreateApplicationsController {
	constructor(
		private readonly applicationsRepository: IApplicationRepository,
		private readonly rolesRepository: IRoleRepository,
	) {}

	async handle({ name }: InsertApplication) {
		const application = await this.applicationsRepository.insert({ name });

		const [superAdminRole, applicationUserRole] = await Promise.all([
			this.rolesRepository.insert({
				name: SYSTEM_ROLES.SUPER_ADMIN,
				permissions: ALL_PERMISSIONS as unknown as string[],
				applicationId: application.id,
			}),
			this.rolesRepository.insert({
				name: SYSTEM_ROLES.APPLICATION_USER,
				permissions: USER_ROLE_PERMISSIONS as unknown as string[],
				applicationId: application.id,
			}),
		]);

		return {
			application,
			superAdminRole,
			applicationUserRole,
		};
	}
}
