import { type IRoleRepository } from '~/modules/roles/repositories';

import { type CreateRoleBody } from './schema';

export class CreateRoleController {
	constructor(private readonly rolesRepository: IRoleRepository) {}

	async execute({ applicationId, name, permissions }: CreateRoleBody) {
		const role = await this.rolesRepository.insert({
			name,
			applicationId,
			permissions,
		});

		return role;
	}
}
