import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import { applications } from './application';
import { roles } from './roles';
import { users } from './users';

export const usersToRoles = pgTable(
	'usersToRoles',
	{
		applicationId: uuid('applicationId')
			.references(() => applications.id)
			.notNull(),

		roleId: uuid('roleId')
			.references(() => roles.id)
			.notNull(),

		userId: uuid('userId')
			.references(() => users.id)
			.notNull(),
	},
	(usersToRoles) => ({
		cpk: primaryKey({
			columns: [usersToRoles.applicationId, usersToRoles.roleId, usersToRoles.userId],
		}),
	}),
);
