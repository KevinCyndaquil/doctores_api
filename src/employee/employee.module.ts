import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from '@employee/employee.service';
import { EmployeeController } from '@employee/employee.controller';
import { Employee } from '@employee/entities/employee.entity';
import { DeparmentModule } from '@deparment/deparment.module';

@Module({
	imports: [TypeOrmModule.forFeature([Employee], 'empleados'), forwardRef(() => DeparmentModule)],
	controllers: [EmployeeController],
	providers: [EmployeeService],
	exports: [EmployeeService]
})
export class EmployeeModule {}
