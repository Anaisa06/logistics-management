import { injectable } from 'tsyringe';
import { Warehouse } from '../models/warehouse.model';

@injectable()
export default class WarehouseRepository{
    async findAll(){
        return await Warehouse.findAll();
    }

    async findById(id: number){
        return await Warehouse.findByPk(id);
    }

    async create(warehouse: Partial<Warehouse>){
        return await Warehouse.create(warehouse);
    }

    async update(id: number, warehouse: Partial<Warehouse>){
        return await Warehouse.update(warehouse, { where: { id } });
    }

    async delete(id: number) {
        return await Warehouse.destroy({ where: { id }});
    }
}