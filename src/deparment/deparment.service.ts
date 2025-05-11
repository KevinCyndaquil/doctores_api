import { CoreService } from 'src/core/core.service';
import { Deparment } from './entities/deparment.entity';
import { CreateDeparmentDTO } from './dto/create-deparment.dto';
import { UpdateDeparmentDTO } from './dto/update-deparment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SingleDeparmentDTO } from './dto/single-deparment.dto';
import { BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';

export class DeparmentService extends CoreService<
	Deparment,
	CreateDeparmentDTO,
	UpdateDeparmentDTO
> {
	constructor(
		@InjectRepository(Deparment, 'empleados')
		repository: Repository<Deparment>,
		@Inject(forwardRef(() => EmployeeService))
		private readonly employeeService: EmployeeService
	) {
		super(repository);
	}

	async findSingleAll(): Promise<SingleDeparmentDTO[]> {
		return await this.repository
			.createQueryBuilder('child')
			.leftJoin('deparments', 'parent', 'child.parentId = parent.id')
			.select('parent.id', 'id')
			.addSelect('parent.name', 'name')
			.addSelect('COUNT(parent.id)', 'childrenCount')
			.where('parent.id IS NOT null AND parent.hidden = false')
			.groupBy('parent.id')
			.addGroupBy('parent.name')
			.getRawMany();
	}

	async findRoot(): Promise<SingleDeparmentDTO[]> {
		return await this.repository
			.createQueryBuilder('child')
			.leftJoin('deparments', 'parent', 'child.parentId = parent.id')
			.select('parent.id', 'id')
			.addSelect('parent.name', 'name')
			.addSelect('COUNT(parent.id)', 'childrenCount')
			.where('parent.id IS NOT null AND parent.parentId IS null AND parent.hidden = false')
			.groupBy('parent.id')
			.addGroupBy('parent.name')
			.getRawMany();
	}

	async findChildren(parent_id: number): Promise<SingleDeparmentDTO[]> {
		return await this.repository
			.createQueryBuilder('parent')
			.leftJoin('deparments', 'child', 'child.parentId = parent.id')
			.select('parent.id', 'id')
			.addSelect('parent.name', 'name')
			.addSelect('COUNT(child.id)', 'childrenCount')
			.where('parent.parentId = :parent_id AND parent.hidden = false', { parent_id: parent_id })
			.groupBy('parent.id')
			.addGroupBy('parent.name')
			.getRawMany();
	}

	async assignSubDeparment(parent_id: number, child_id: number): Promise<boolean> {
		const parent = await this.findOne(parent_id);
		var child = await this.findOne(child_id);

		child.parent = parent;

		var result = await this.repository.update(child_id, child);
		return (result.affected ?? 0) > 0;
	}

	async deassignSubDeparment(parent_id: number, child_id: number): Promise<Deparment> {
		const parent = await this.findOne(parent_id);
		var child = await this.findOne(child_id, ['parent']);

		if (child.parent?.id !== parent_id)
			throw new BadRequestException(
				`Deparment ${child.name} is not assigned to deparment ${parent.name}`
			);

		child.parent = null;
		return await this.repository.save(child);
	}

	override async softDelete(id: number): Promise<Deparment> {
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
}
