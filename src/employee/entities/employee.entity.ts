import { Exclude } from 'class-transformer';
import { Deparment } from 'src/deparment/entities/deparment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

	@ManyToOne(() => Deparment, (d) => d.employees, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	deparment: Deparment;
}
