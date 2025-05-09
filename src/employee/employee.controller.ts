import { CoreController } from 'src/core/core.controller';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController extends CoreController<
	Employee,
	CreateEmployeeDTO,
	UpdateEmployeeDTO,
	EmployeeService
> {
	constructor(@Inject() service: EmployeeService) {
		super(service);
	}

	@Put('assign/deparment/:employee_id/:deparment_id')
	async assignDeparment(
		@Param('employee_id') employee_id: number,
		@Param('deparment_id') deparment_id: number
	): Promise<boolean> {
		return this.service.assignDeparment(employee_id, deparment_id);
	}

	@Get('in/deparment/:deparment_id')
	async findAllAssignedToDeparment(
		@Param('deparment_id') deparment_id: number
	): Promise<Employee[]> {
		return this.service.findAllAssignedToDeparment(deparment_id);
	}
}
