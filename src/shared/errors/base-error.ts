import { type HttpStatusCode } from './http-status-code';

export abstract class BaseError extends Error {
	statusCode: HttpStatusCode;

	constructor(message: string, statusCode: HttpStatusCode) {
		super(message);

		this.name = this.constructor.name;
		this.statusCode = statusCode;
	}
}
