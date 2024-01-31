import 'fastify';

type UserRequest = {
	id: string;
	applicationId: string;
	scopes: string[];
};

declare module 'fastify' {
	interface FastifyRequest {
		user: UserRequest;
	}
}
