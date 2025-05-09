import { IsOptional, IsString } from 'class-validator';

export class UpdateDeparmentDTO {
	@IsString()
	@IsOptional()
	name: string;
}
