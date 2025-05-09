import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

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

	app.useGlobalFilters(new ErrorInterceptor());

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
