import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import {
	pgTable,
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

import { applications } from './application';

export const roles = pgTable(
	'roles',
	{
		id: uuid('id').defaultRandom().notNull(),
		name: varchar('name', { length: 256 }).notNull(),
		applicationId: uuid('application_id').references(() => applications.id),
		permissions: text('permissions').array().$type<string[]>(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	(roles) => ({
		cpk: primaryKey({ columns: [roles.name, roles.applicationId] }),
		idIndex: uniqueIndex('roles_id_index').on(roles.id),
	}),
);

export type InsertRole = InferInsertModel<typeof roles>;

export type UpdateRole = Omit<Partial<InsertRole>, 'id'>;

export type Role = InferSelectModel<typeof roles>;
