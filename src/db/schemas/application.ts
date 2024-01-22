import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const applications = pgTable('applications', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 256 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type InsertApplication = InferInsertModel<typeof applications>;

export type UpdateApplication = Omit<Partial<InsertApplication>, 'id'>;

export type Application = InferSelectModel<typeof applications>;
