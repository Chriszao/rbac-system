import { type IApplicationRepository } from '~/modules/applications/repositories';

export class GetApplicationsController {
	constructor(private readonly applicationsRepository: IApplicationRepository) {}

	async handle() {
		const applications = await this.applicationsRepository.fetch();

		return applications;
	}
}
