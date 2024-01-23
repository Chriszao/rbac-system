import { BaseError } from './base-error';
import { HttpStatusCode } from './http-status-code';

export class NotFoundError extends BaseError {
	constructor(message: string) {
		super(message, HttpStatusCode.NOT_FOUND);
	}
}
