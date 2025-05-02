import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
