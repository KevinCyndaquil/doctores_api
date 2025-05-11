import { CoreController } from 'src/core/core.controller';
import { Deparment } from './entities/deparment.entity';
import { CreateDeparmentDTO } from './dto/create-deparment.dto';
import { UpdateDeparmentDTO } from './dto/update-deparment.dto';
import { Controller, Delete, Get, Inject, Param, Put } from '@nestjs/common';
import { DeparmentService } from './deparment.service';
import { SingleDeparmentDTO } from './dto/single-deparment.dto';

@Controller('deparments')
export class DeparmentController extends CoreController<
	Deparment,
	CreateDeparmentDTO,
	UpdateDeparmentDTO,
	DeparmentService
> {
	constructor(@Inject() service: DeparmentService) {
		super(service);
	}

	@Get('single')
	async findSingleAll(): Promise<SingleDeparmentDTO[]> {
		return await this.service.findSingleAll();
	}

	@Get('root')
	async findRoot(): Promise<SingleDeparmentDTO[]> {
		return await this.service.findRoot();
	}

	@Get('children/:parent_id')
	async findChildren(@Param('parent_id') parent_id: number): Promise<SingleDeparmentDTO[]> {
		return await this.service.findChildren(parent_id);
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
	): Promise<Deparment> {
		return await this.service.deassignSubDeparment(parent_id, child_id);
	}
}
