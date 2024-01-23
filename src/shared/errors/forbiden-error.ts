import { BaseError } from './base-error';
import { HttpStatusCode } from './http-status-code';

export class ForbiddenError extends BaseError {
	constructor(message: string) {
		super(message, HttpStatusCode.FORBIDDEN);
	}
}
