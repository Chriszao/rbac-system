import { buildServer } from '~/http/server';

async function gracefulShutdown({ app }: { app: Awaited<ReturnType<typeof buildServer>> }) {
	await app.close();
}

async function main() {
	const app = await buildServer();

	await app.listen({ port: 3000, host: '0.0.0.0' });

	const signals = ['SIGINT', 'SIGTERM'];

	for (const signal of signals) {
		process.on(signal, () => gracefulShutdown({ app }));
	}
}

main();
