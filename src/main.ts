import { env } from '~/config';
import { db } from '~/db';
import { buildServer } from '~/http';
import { logger } from '~/utils';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

async function gracefulShutdown({ app }: { app: Awaited<ReturnType<typeof buildServer>> }) {
	await app.close();
}

async function main() {
	const app = await buildServer();

	logger.debug(env, 'using env');

	await app.listen({ port: env.PORT, host: env.HOST });

	await migrate(db, { migrationsFolder: './migrations' });

	const signals = ['SIGINT', 'SIGTERM'];

	for (const signal of signals) {
		process.on(signal, () => gracefulShutdown({ app }));
	}
}

main();
