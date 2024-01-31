import { type IUsersRepository } from '../../repositories';
import { type AssignRoleToUserBody } from './schema';

export class AssignRoleToUserController {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute({
		userId,
		roleId,
		applicationId,
	}: AssignRoleToUserBody & { applicationId: string }) {
		const user = await this.usersRepository.assignRoleToUser({ applicationId, roleId, userId });

		return user;
	}
}
