import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRoot({
			name: 'empleados',
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'kevincyndaquil',
			password: '*',
			database: 'empleados',
			entities: [Doctor],
			autoLoadEntities: false,
			synchronize: true
		}),
		TypeOrmModule.forRoot({
			name: 'clientes',
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'kevincyndaquil',
			password: '*',
			database: 'clientes',
			entities: [Patient],
			autoLoadEntities: false,
			synchronize: true
		})
	],
	exports: [TypeOrmModule]
})
export class MySqlModule {}
