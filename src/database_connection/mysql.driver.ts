import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Deparment } from 'src/deparment/entities/deparment.entity';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRoot({
			name: 'empleados',
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'kevincyndaquil',
			password: 'qw6xdg7sB!',
			database: 'empleados',
			entities: [Employee, Deparment],
			autoLoadEntities: false,
			synchronize: true
		}),
		TypeOrmModule.forRoot({
			name: 'clientes',
			type: 'mysql',
			host: '127.0.0.1',
			port: 3306,
			username: 'kevincyndaquil',
			password: 'qw6xdg7sB!',
			database: 'clientes',
			entities: [],
			autoLoadEntities: false,
			synchronize: true
		})
	],
	exports: [TypeOrmModule]
})
export class MySqlModule {}
