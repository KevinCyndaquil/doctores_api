import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { CreateDoctorDTO } from './dto/create-doctor.dto';
import { UpdateDoctorDTO } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
	constructor(
		@InjectRepository(Doctor, 'empleados')
		private readonly repository: Repository<Doctor>
	) {}

	async create(doctorDTO: CreateDoctorDTO): Promise<Doctor> {
		const doctor = this.repository.create(doctorDTO);
		return await this.repository.save(doctor);
	}

	async findAll(): Promise<Doctor[]> {
		return await this.repository.find();
	}

	async findById(id: string): Promise<Doctor> {
		const matchedDoctor = await this.repository.findOne({
			where: { id }
		});

		if (matchedDoctor) return matchedDoctor;

		throw new NotFoundException(`No se encontro el doctor con id ${id}}`);
	}

	async update(id: string, doctorDTO: UpdateDoctorDTO): Promise<Doctor> {
		const doctor = await this.repository.preload({
			id,
			...doctorDTO
		});

		if (!doctor) throw new NotFoundException(`No se encontró el doctor con id ${id}`);

		return this.repository.save(doctor);
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.repository.delete({ id });

		return (result.affected ?? 0) > 0;
	}
}
