import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Doctor])],
	controllers: [DoctorController],
	providers: [DoctorService],
	exports: [DoctorService]
})
export class DoctorModule {}
