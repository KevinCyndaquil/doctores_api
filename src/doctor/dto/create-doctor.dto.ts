import { IsString } from 'class-validator';

export class CreateDoctorDTO {
	@IsString()
	name: string;

	@IsString()
	lastname: string;
}
