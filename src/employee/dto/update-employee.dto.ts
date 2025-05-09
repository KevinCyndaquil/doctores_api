import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDTO {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	lastname: string;

	@IsOptional()
	@IsDateString()
	birthday: string;
}
