import { IsString } from 'class-validator';

export class CreateDepartmentDTO {
	@IsString()
	name: string;
}
