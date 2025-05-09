import { TypeOrmModule } from '@nestjs/typeorm';
import { Deparment } from './entities/deparment.entity';
import { forwardRef, Module } from '@nestjs/common';
import { DeparmentController } from './deparment.controller';
import { DeparmentService } from './deparment.service';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
	imports: [TypeOrmModule.forFeature([Deparment], 'empleados'), forwardRef(() => EmployeeModule)],
	controllers: [DeparmentController],
	providers: [DeparmentService],
	exports: [DeparmentService]
})
export class DeparmentModule {}
