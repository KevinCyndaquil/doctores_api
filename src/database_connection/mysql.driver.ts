import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'kevincyndaquil',
			password: '*',
			database: 'pruebas',
			autoLoadEntities: true,
			synchronize: true
		})
	],
	exports: [TypeOrmModule]
})
export class MySqlModule {}
