import { Exclude } from 'class-transformer';
import { Employee } from 'src/employee/entities/employee.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departments')
export class Department implements Hideable {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => Employee, (e) => e.deparment)
	employees: Employee[];

	@ManyToOne(() => Department, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	parent: Department | null;

	@Column({ default: false })
	@Exclude()
	hidden: boolean;
}
