import { Expose } from 'class-transformer';

export class HardDepartmentDTO {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	children: HardDepartmentDTO[];
}
