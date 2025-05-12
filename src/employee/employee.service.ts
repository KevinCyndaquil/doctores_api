import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { CoreService } from 'src/core/core.service';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { DepartmentService } from '@department/department.service';

@Injectable()
export class EmployeeService extends CoreService<Employee, CreateEmployeeDTO, UpdateEmployeeDTO> {
	constructor(
		@InjectRepository(Employee, 'empleados')
		repository: Repository<Employee>,
		@Inject(forwardRef(() => DepartmentService))
		private readonly deparmentService: DepartmentService
	) {
		super(repository);
	}

	async assignDeparment(employee_id: number, deparment_id: number): Promise<boolean> {
		const deparment = await this.deparmentService.findOne(deparment_id);
		var employee = await this.findOne(employee_id);

		employee.deparment = deparment;

		const result = await this.repository.update(employee_id, employee);
		return (result.affected ?? 0) > 0;
	}

	async deassignDeparment(employee_id: number, deparment_id: number): Promise<Employee> {
		const deparment = await this.deparmentService.findOne(deparment_id);
		var employee = await this.findOne(employee_id, ['deparment']);

		if (employee.deparment?.id !== deparment_id)
			throw new BadRequestException(
				`Employee with id ${employee_id} is not assigned to deparment ${deparment.name}`
			);

		employee.deparment = null;
		return await this.repository.save(employee);
	}

	async findAllAssignedToDeparment(deparment_id: number): Promise<Employee[]> {
		return await this.repository.find({
			where: { deparment: { id: deparment_id }, hidden: false }
		});
	}

	async countAllAssignedToDeparment(deparment_id: number): Promise<number> {
		return await this.repository.count({
			where: { deparment: { id: deparment_id }, hidden: false }
		});
	}
}
