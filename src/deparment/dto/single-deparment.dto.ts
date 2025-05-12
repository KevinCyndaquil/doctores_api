import { Expose } from 'class-transformer';

export class SingleDeparmentDTO {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	childrenCount: number;
}
