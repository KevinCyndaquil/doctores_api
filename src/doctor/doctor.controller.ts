import { Controller, Get, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { CreateDoctorDTO } from './dto/create-doctor.dto';
import { UpdateDoctorDTO } from './dto/update-doctor.dto';
import { DoctorService } from './doctor.service';
import { Doctor } from './entities/doctor.entity';

@Controller('doctors')
export class DoctorController {
	constructor(private service: DoctorService) {}

	@Post()
	async create(@Body() createDoctorDTO: CreateDoctorDTO): Promise<Doctor> {
		return this.service.create(createDoctorDTO);
	}

	@Get()
	async findAll(): Promise<Doctor[]> {
		return this.service.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Doctor> {
		return this.service.findById(id);
	}

	@Put(':id')
	updateOne(@Param('id') id: string, @Body() updateDoctorDTO: UpdateDoctorDTO): Promise<Doctor> {
		return this.service.update(id, updateDoctorDTO);
	}

	@Delete(':id')
	async deleteOne(@Param('id') id: string): Promise<string> {
		return (await this.service.delete(id))
			? `Se ha borrado el doctor de id ${id}`
			: 'No se han hecho modificaciones';
	}
}
