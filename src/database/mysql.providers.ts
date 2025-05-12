import { clientesDataSource } from './datasources/clientes.datasource';
import { empleadosDataSource } from './datasources/empleados.datasource';

export const mysqlProviders = [
	{
		provide: 'DATA_SOURCE_EMPLEADOS',
		useFactory: async () => {
			if (!empleadosDataSource.isInitialized) await empleadosDataSource.initialize();
			return empleadosDataSource;
		}
	},
	{
		provide: 'DATA_SOURCE_CLIENTES',
		useFactory: async () => {
			if (!clientesDataSource.isInitialized) await clientesDataSource.initialize();
			return clientesDataSource;
		}
	}
];
