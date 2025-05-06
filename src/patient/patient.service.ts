import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDTO } from './dto/create-patient.dto';
import { UpdatePatientDTO } from './dto/update-patiend.dto';

@Injectable()
export class PatientService {
	constructor(
		@InjectRepository(Patient, 'clientes')
		private readonly repository: Repository<Patient>
	) {}

	async create(patientDTO: CreatePatientDTO): Promise<Patient> {
		const patient = this.repository.create(patientDTO);
		return await this.repository.save(patient);
	}

	async findAll(): Promise<Patient[]> {
		return await this.repository.find();
	}

	async findById(id: string): Promise<Patient> {
		const matchedPatient = await this.repository.findOne({
			where: { id }
		});

		if (matchedPatient) return matchedPatient;

		throw new NotFoundException(`No se encontro el paciente con id ${id}}`);
	}

	async update(id: string, patientDTO: UpdatePatientDTO): Promise<Patient> {
		const patient = await this.repository.preload({
			id,
			...patientDTO
		});

		if (!patient) throw new NotFoundException(`No se encontró el paciente con id ${id}`);

		return this.repository.save(patient);
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.repository.delete({ id });

		return (result.affected ?? 0) > 0;
	}
}
