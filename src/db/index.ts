import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { env } from '~/config';
import type * as schemas from '~/db/schemas';

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

export const db = drizzle<typeof schemas>(pool);
