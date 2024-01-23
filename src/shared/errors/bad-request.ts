import { BaseError } from './base-error';
import { HttpStatusCode } from './http-status-code';

export class BadRequestError extends BaseError {
	constructor(message: string) {
		super(message, HttpStatusCode.BAD_REQUEST);
	}
}
