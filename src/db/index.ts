import { env } from '~/config';
import type * as schemas from '~/db/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

export const db = drizzle<typeof schemas>(pool);
