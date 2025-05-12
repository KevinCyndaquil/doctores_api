import { CoreController } from 'src/core/core.controller';
import { Department } from './entities/department.entity';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
import { Controller, Delete, Get, Inject, Param, Put } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { SingleDepartmentDTO } from './dto/single-department.dto';
import { HardDepartmentDTO } from './dto/hard-department.dto';

@Controller('departments')
export class DepartmentController extends CoreController<
	Department,
	CreateDepartmentDTO,
	UpdateDepartmentDTO,
	DepartmentService
> {
	constructor(@Inject() service: DepartmentService) {
		super(service);
	}

	@Get('single')
	async findSingleAll(): Promise<HardDepartmentDTO[]> {
		return await this.service.findSingleAll();
	}

	@Get('root')
	async findRoot(): Promise<SingleDepartmentDTO[]> {
		return await this.service.findTree(0);
	}

	@Get('children/:parent_id')
	async findChildren(@Param('parent_id') parent_id: number): Promise<SingleDepartmentDTO[]> {
		return await this.service.findTree(parent_id);
	}

	@Put('assign/sub/:parent_id/:child_id')
	async assignSubDeparment(
		@Param('parent_id') parent_id: number,
		@Param('child_id') child_id: number
	): Promise<boolean> {
		return await this.service.assignSubDeparment(parent_id, child_id);
	}

	@Delete('deassign/sub/:parent_id/:child_id')
	async deassignSubDeparment(
		@Param('parent_id') parent_id: number,
		@Param('child_id') child_id: number
	): Promise<Department> {
		return await this.service.deassignSubDeparment(parent_id, child_id);
	}
}
