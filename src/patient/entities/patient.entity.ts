import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	lastname: string;

	@Column()
	gender: string;

	@Column()
	birthday: Date;

	@Column()
	curp: string;

	@Column()
	state: string;

	@ManyToMany(() => Doctor, (d) => d.patients)
	@JoinTable({
		name: 'consultas',
		joinColumn: {
			name: 'patient_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'doctor_id',
			referencedColumnName: 'id'
		}
	})
	doctors: Doctor[];
}
