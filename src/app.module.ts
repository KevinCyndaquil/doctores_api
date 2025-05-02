import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { MySqlModule } from './database_connection/mysql.driver';
import { PatientModule } from './patient/patient.module';

@Module({
	imports: [DoctorModule, PatientModule, MySqlModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
