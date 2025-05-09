import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { MySqlModule } from './database_connection/mysql.driver';
import { PatientModule } from './patient/patient.module';
import { EmployeeModule } from './employee/employee.module';
import { DeparmentModule } from './deparment/deparment.module';

@Module({
	imports: [EmployeeModule, DeparmentModule, MySqlModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
