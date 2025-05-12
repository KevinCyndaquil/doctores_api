import { Inject, Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DataSource } from 'typeorm';

@Injectable()
export class MySqlPopulate implements OnApplicationBootstrap {
	constructor(@Inject('DATA_SOURCE_EMPLEADOS') private readonly empleadosDataSource: DataSource) {}

	async onApplicationBootstrap() {
		const sqlPath = join(__dirname, '../../src/database/sql');

		const procedures = readFileSync(join(sqlPath, 'procedures.sql'), 'utf-8');
		const departments = readFileSync(join(sqlPath, 'departments.sql'), 'utf-8');

		await this.empleadosDataSource.query(procedures);

		const [departmentsRows] = await this.empleadosDataSource.query(
			'SELECT COUNT(*) AS count FROM departments'
		);
		const departmentsCount = parseInt(departmentsRows.count, 10);

		if (departmentsCount === 0) await this.empleadosDataSource.query(departments);
	}
}
