import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorInterceptor implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		response.status(exception.getStatus()).json({
			code: exception.getStatus(),
			message:
				typeof exception.getResponse() === 'string'
					? exception.getResponse()
					: ((exception.getResponse() as any).message ?? 'Not message'),
			data: null,
			timestamp: new Date().toISOString()
		});
	}
}
