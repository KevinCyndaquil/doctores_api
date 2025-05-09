import { IsString } from 'class-validator';

export class CreateDeparmentDTO {
	@IsString()
	name: string;
}
