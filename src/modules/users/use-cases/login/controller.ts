import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { env } from '~/config';
import { type IUsersRepository } from '~/modules/users/repositories';
import { ForbiddenError } from '~/shared/errors/forbiden-error';

import { type LoginBody } from './schema';

export class LoginController {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute({ email, password, applicationId }: LoginBody) {
		const user = await this.usersRepository.getByEmail({ applicationId, email });

		if (!user) {
			throw new ForbiddenError('Invalid email or password');
		}

		const isPasswordValid = await argon2.verify(user.password, password);

		if (!isPasswordValid) {
			throw new ForbiddenError('Invalid email or password');
		}

		const token = jwt.sign(
			{
				id: user.id,
				email,
				applicationId,
				scopes: user.permissions,
			},
			env.JWT_SECRET,
		);

		return {
			token,
		};
	}
}
