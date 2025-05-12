import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { MySqlDriver } from './database/mysql.driver';
import { PatientModule } from './patient/patient.module';
import { EmployeeModule } from './employee/employee.module';
import { DeparmentModule } from './department/department.module';
import { MySqlPopulate } from './database/mysql.populate';

@Module({
	imports: [EmployeeModule, DeparmentModule, MySqlDriver],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
