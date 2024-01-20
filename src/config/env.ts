import zennv from 'zennv';
import { z } from 'zod';

export const env = zennv({
	dotenv: true,
	schema: z.object({
		PORT: z.coerce.number().default(3000),
		HOST: z.string().default('0.0.0.0'),
		POSTGRES_USER: z.string(),
		POSTGRES_PASSWORD: z.string(),
		POSTGRES_DB: z.string(),
	}),
});
