import { Expose } from 'class-transformer';

export class SingleDepartmentDTO {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	childrenCount: number;
}
