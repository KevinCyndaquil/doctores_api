import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
	intercept(
		context: ExecutionContext,
		next: CallHandler<T>
	): Observable<any> | Promise<Observable<any>> {
		const ctxt = context.switchToHttp();
		const response = ctxt.getResponse();

		return next.handle().pipe(
			map((data) => {
				return {
					code: response.statusCode,
					message: response.statusCode === 201 ? 'Resource Created' : 'Request Success',
					data,
					timestamp: new Date().toISOString()
				};
			})
		);
	}
}
