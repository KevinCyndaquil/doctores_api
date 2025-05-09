import { Patient } from 'src/patient/entities/patient.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Doctor {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	lastname: string;

	@ManyToMany(() => Patient, (p) => p.doctors)
	patients: Patient[];
}
