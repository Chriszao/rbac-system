import { type IUsersRepository } from '../../repositories';
import { type AssignRoleToUserBody } from './schema';

export class AssignRoleToUserController {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute({ userId, roleId, applicationId }: AssignRoleToUserBody) {
		const user = await this.usersRepository.assignRoleToUser({ applicationId, roleId, userId });

		return user;
	}
}
