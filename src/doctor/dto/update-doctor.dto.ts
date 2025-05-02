import { IsString, IsOptional } from 'class-validator';

export class UpdateDoctorDTO {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	lastname: string;
}
