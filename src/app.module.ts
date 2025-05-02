import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlModule } from './database_connection/mysql.driver';

@Module({
	imports: [DoctorModule, MySqlModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
