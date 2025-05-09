import { IsDateString, IsString } from 'class-validator';

export class CreateEmployeeDTO {
	@IsString()
	name: string;

	@IsString()
	lastname: string;

	@IsDateString()
	birthday: string;
}
