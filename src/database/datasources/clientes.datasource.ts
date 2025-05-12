import { DataSource } from 'typeorm';

export const clientesDataSource = new DataSource({
	name: 'clientes',
	type: 'mysql',
	host: '127.0.0.1',
	port: 3306,
	username: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PSWD,
	database: 'clientes',
	entities: [],
	synchronize: true,
	multipleStatements: true
});
