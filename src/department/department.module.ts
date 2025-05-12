import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { forwardRef, Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
	imports: [TypeOrmModule.forFeature([Department], 'empleados'), forwardRef(() => EmployeeModule)],
	controllers: [DepartmentController],
	providers: [DepartmentService],
	exports: [DepartmentService]
})
export class DeparmentModule {}
