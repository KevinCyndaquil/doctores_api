import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	UnauthorizedException
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(HttpException)
export class HttpErrorInterceptor implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		let status = exception.getStatus();

		response.status(status).json({
			code: status,
			message: getErrorMessage(exception),
			data: null,
			timestamp: new Date().toISOString()
		});
	}
}

@Catch(RangeError, SyntaxError, URIError, QueryFailedError)
export class BadRequestInterceptor implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		let status = HttpStatus.BAD_REQUEST;

		response.status(status).json({
			code: status,
			message: getErrorMessage(exception),
			data: null,
			timestamp: new Date().toISOString()
		});
	}
}

@Catch(TypeError, ReferenceError, EvalError)
export class InternalErrorInterceptor implements ExceptionFilter {
	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		let status = HttpStatus.INTERNAL_SERVER_ERROR;

		response.status(status).json({
			code: status,
			message: getErrorMessage(exception),
			data: null,
			timestamp: new Date().toISOString()
		});
	}
}

function getErrorMessage(exception: any): string {
	console.log(` ! Exception Catched: ${exception.constructor?.name ?? 'UnknowException'}`);

	if (exception instanceof HttpException)
		return typeof exception.getResponse() === 'string'
			? exception.getResponse().toString()
			: ((exception.getResponse() as any).message ?? 'Not Message');
	else if (exception instanceof Error) return exception.message;
	return 'UnknowError';
}
