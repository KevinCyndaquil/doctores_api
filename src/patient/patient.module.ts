import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
	imports: [TypeOrmModule.forFeature([Patient], 'clientes')],
	controllers: [PatientController],
	providers: [PatientService],
	exports: [PatientService]
})
export class PatientModule {}
