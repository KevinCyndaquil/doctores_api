import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDTO } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { UpdatePatientDTO } from './dto/update-patiend.dto';

@Controller('patients')
export class PatientController {
	constructor(@Inject() private readonly service: PatientService) {}

	@Post()
	async create(@Body() createPatientDTO: CreatePatientDTO): Promise<Patient> {
		return this.service.create(createPatientDTO);
	}

	@Get()
	async findAll(): Promise<Patient[]> {
		return this.service.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Patient> {
		return this.service.findById(id);
	}

	@Put(':id')
	updateOne(@Param('id') id: string, @Body() updatePatientDTO: UpdatePatientDTO): Promise<Patient> {
		return this.service.update(id, updatePatientDTO);
	}

	@Delete(':id')
	async deleteOne(@Param('id') id: string): Promise<string> {
		return (await this.service.delete(id))
			? `Se ha borrado el paciente de id ${id}`
			: 'No se han hecho modificaciones';
	}
}
