import { Exclude } from 'class-transformer';
import { Employee } from 'src/employee/entities/employee.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('deparments')
export class Deparment implements Hideable {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => Employee, (e) => e.deparment)
	employees: Employee[];

	@ManyToOne(() => Deparment, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	parent: Deparment | null;

	@Column({ default: false })
	@Exclude()
	hidden: boolean;
}
