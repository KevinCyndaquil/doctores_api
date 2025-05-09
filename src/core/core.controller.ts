import { DeepPartial, ObjectLiteral } from 'typeorm';
import { CoreService } from './core.service';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';

export class CoreController<
	T extends ObjectLiteral & Hideable,
	C extends DeepPartial<T>,
	U extends DeepPartial<T>,
	S extends CoreService<T, C, U>
> {
	constructor(protected readonly service: S) {}

	@Post()
	async create(@Body() createDTO: C): Promise<T> {
		return this.service.create(createDTO);
	}

	@Get()
	async findAll(): Promise<T[]> {
		return await this.service.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<T> {
		return await this.service.findOne(id);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() updateDTO: U): Promise<T> {
		return await this.service.update(id, updateDTO);
	}

	@Delete('soft/:id')
	async softDelete(@Param('id') id: number): Promise<T> {
		return await this.service.softDelete(id);
	}

	@Delete('hard/:id')
	async delete(@Param('id') id: number): Promise<boolean> {
		return await this.service.delete(id);
	}
}
