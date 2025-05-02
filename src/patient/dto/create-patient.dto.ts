import { Transform } from 'class-transformer';
import { IsDateString, IsString, Matches } from 'class-validator';

export class CreatePatientDTO {
	@IsString()
	name: string;

	@IsString()
	lastname: string;

	@IsString()
	@Transform(({ value }) => value?.toUpperCase())
	@Matches(/^HOMBRE|MUJER$/, { message: 'Sexo invalido, usa HOMBRE o MUJER' })
	gender: string;

	@IsDateString()
	birthday: string;

	@IsString()
	@Matches(
		/^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/,
		{ message: 'CURP inválida' }
	)
	curp: string;
}
