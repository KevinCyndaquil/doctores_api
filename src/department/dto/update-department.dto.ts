import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDTO {
	@IsString()
	@IsOptional()
	name: string;
}
