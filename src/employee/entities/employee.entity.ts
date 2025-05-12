import { Exclude } from 'class-transformer';
import { Department } from '@department/entities/department.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee implements Hideable {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	lastname: string;

	@Column()
	birthday: Date;

	@Column({ default: false })
	@Exclude()
	hidden: boolean;

	@ManyToOne(() => Department, (d) => d.employees, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	deparment: Department | null;
}
