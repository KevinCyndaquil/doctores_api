import { Expose } from 'class-transformer';

export class SingleDeparmentDTO {
	@Expose()
	id: string;

	@Expose()
	name: string;

	@Expose()
	childrenCount: number;
}
