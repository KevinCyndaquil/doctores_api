import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

export class CoreService<
	T extends ObjectLiteral & Hideable,
	C extends DeepPartial<T>,
	U extends DeepPartial<T>
> {
	constructor(protected readonly repository: Repository<T>) {}

	async create(createDTO: C): Promise<T> {
		const t = this.repository.create(createDTO);
		return await this.repository.save(t);
	}

	async findAll(relations: string[] = []): Promise<T[]> {
		return await this.repository.find({
			where: { hidden: false } as FindOptionsWhere<T>,
			relations: relations
		});
	}

	async findOne(id: number, relations: string[] = []): Promise<T> {
		const found = await this.repository.findOne({
			where: {
				id: id as any,
				hidden: false
			} as FindOptionsWhere<T>,
			relations: relations
		});

		if (!found) throw new NotFoundException(`No se encontro un registro con el id ${id}`);
		return found;
	}

	async update(id: number, updateDTO: U): Promise<T> {
		const row = await this.repository.preload({
			id,
			...updateDTO
		});

		if (!row) throw new NotFoundException(`No se encontro un registro con el id ${id}`);
		return this.repository.save(row);
	}

	async softDelete(id: number): Promise<T> {
		const row = await this.repository.preload({ id, hidden: true } as any);

		if (!row)
			throw new NotFoundException(
				`No se encontro un registro con el id ${id} o no contiene la propiedad hidden`
			);
		return this.repository.save(row);
	}

	async delete(id: number): Promise<boolean> {
		const result = await this.repository.delete(id);

		return (result.affected ?? 0) > 0;
	}
}
