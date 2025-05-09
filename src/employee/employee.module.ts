import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './entities/employee.entity';
import { DeparmentModule } from 'src/deparment/deparment.module';

@Module({
	imports: [TypeOrmModule.forFeature([Employee], 'empleados'), forwardRef(() => DeparmentModule)],
	controllers: [EmployeeController],
	providers: [EmployeeService],
	exports: [EmployeeService]
})
export class EmployeeModule {}
