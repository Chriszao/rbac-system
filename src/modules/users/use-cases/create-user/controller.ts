import { SYSTEM_ROLES } from '~/config/permissions';
import { type IRoleRepository } from '~/modules/roles/repositories';
import { type IUsersRepository } from '~/modules/users/repositories';
import { BadRequestError, NotFoundError } from '~/shared/errors';

import { type CreateUserBody } from './schema';

export class CreateUserController {
	constructor(
		private readonly usersRepository: IUsersRepository,
		private readonly rolesRepository: IRoleRepository,
	) {}

	async handle({ initialUser, ...data }: CreateUserBody) {
		const roleName = initialUser ? SYSTEM_ROLES.SUPER_ADMIN : SYSTEM_ROLES.APPLICATION_USER;

		if (roleName === SYSTEM_ROLES.SUPER_ADMIN) {
			const appUsers = await this.usersRepository.getByApplicationId(data.applicationId);

			if (appUsers.length > 0) {
				throw new BadRequestError('Application already has a super admin');
			}
		}

		const role = await this.rolesRepository.getByName({
			name: roleName,
			applicationId: data.applicationId,
		});

		if (!role) {
			throw new NotFoundError('Role not found');
		}

		const user = await this.usersRepository.insert(data);

		await this.usersRepository.assignRoleToUser({
			userId: user.id,
			roleId: role.id,
			applicationId: data.applicationId,
		});

		return user;
	}
}
