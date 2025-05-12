import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Department } from '@department/entities/department.entity';
import { MySqlPopulate } from './mysql.populate';
import { mysqlProviders } from './mysql.providers';
import { empleadosDataSource } from './datasources/empleados.datasource';
import { clientesDataSource } from './datasources/clientes.datasource';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			name: 'empleados',
			useFactory: async () => empleadosDataSource.options
		}),
		TypeOrmModule.forRootAsync({
			name: 'clientes',
			useFactory: async () => clientesDataSource.options
		})
	],
	providers: [...mysqlProviders, MySqlPopulate],
	exports: [...mysqlProviders, TypeOrmModule]
})
export class MySqlDriver {}
