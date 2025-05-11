import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import {
	BadRequestInterceptor,
	InternalErrorInterceptor,
	HttpErrorInterceptor
} from './core/interceptors/error.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	);

	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
		new ResponseInterceptor()
	);

	app.useGlobalFilters(
		new HttpErrorInterceptor(),
		new BadRequestInterceptor(),
		new InternalErrorInterceptor()
	);

	app.enableCors({
		origin: 'http://localhost:4200',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true
	});

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
