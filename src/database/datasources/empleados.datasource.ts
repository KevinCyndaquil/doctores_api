import { Department } from '@department/entities/department.entity';
import { Employee } from '@employee/entities/employee.entity';
import { DataSource } from 'typeorm';

export const empleadosDataSource = new DataSource({
	name: 'empleados',
	type: 'mysql',
	host: '127.0.0.1',
	port: 3306,
	username: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PSWD,
	database: 'empleados',
	entities: [Employee, Department],
	synchronize: true,
	multipleStatements: true
});
