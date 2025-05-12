import { CoreService } from 'src/core/core.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SingleDepartmentDTO } from './dto/single-department.dto';
import { BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { HardDepartmentDTO } from './dto/hard-department.dto';
import { plainToInstance } from 'class-transformer';

export class DepartmentService extends CoreService<
	Department,
	CreateDepartmentDTO,
	UpdateDepartmentDTO
> {
	constructor(
		@InjectRepository(Department, 'empleados')
		repository: Repository<Department>,
		@Inject(forwardRef(() => EmployeeService))
		private readonly employeeService: EmployeeService
	) {
		super(repository);
	}

	async findSingleAll(): Promise<HardDepartmentDTO[]> {
		const content = await this.repository.query(
			'SELECT * FROM departments WHERE hidden = false ORDER BY parentId ASC'
		);

		return plainToInstance(HardDepartmentDTO, this.buildTree(content), {
			excludeExtraneousValues: true
		});
	}

	async findTree(tree_id: number): Promise<SingleDepartmentDTO[]> {
		const result = await this.repository.query('CALL GetDepartmentsTree(?)', [tree_id]);

		return result[0].map((row: any) => ({
			...row,
			childrenCount: parseInt(row.childrenCount, 10)
		}));
	}

	async assignSubDeparment(parent_id: number, child_id: number): Promise<boolean> {
		const parent = await this.findOne(parent_id);
		var child = await this.findOne(child_id);

		child.parent = parent;

		var result = await this.repository.update(child_id, child);
		return (result.affected ?? 0) > 0;
	}

	async deassignSubDeparment(parent_id: number, child_id: number): Promise<Department> {
		const parent = await this.findOne(parent_id);
		var child = await this.findOne(child_id, ['parent']);

		if (child.parent?.id !== parent_id)
			throw new BadRequestException(
				`Deparment ${child.name} is not assigned to deparment ${parent.name}`
			);

		child.parent = null;
		return await this.repository.save(child);
	}

	override async softDelete(id: number): Promise<Department> {
		const childrenCount = await this.repository.count({
			where: { parent: { id: id }, hidden: false }
		});
		const employeesInDeparment = await this.employeeService.countAllAssignedToDeparment(id);

		if (employeesInDeparment > 0)
			throw new BadRequestException(`There is employees in deparment with id ${id}`);
		if (childrenCount > 0)
			throw new BadRequestException(
				`There is sub deparments assigned to this deparment with id ${id}`
			);
		return await super.softDelete(id);
	}

	private buildTree(items: any[], parentId: number | null = null): HardDepartmentDTO[] {
		return items
			.filter((item) => item.parentId === parentId)
			.map((item) => ({
				...item,
				children: this.buildTree(items, item.id)
			}));
	}
}
