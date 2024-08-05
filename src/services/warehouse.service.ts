import { injectable, inject } from "tsyringe";
import WarehouseRepository from "../repositories/warehouse.repository";
import { Warehouse } from "../models/warehouse.model";
import { HostNotFoundError } from "sequelize";

@injectable()
export class WarehouseService {
    constructor(@inject(WarehouseRepository) private warehouseRepository: WarehouseRepository){}

    async findAllWarehouses(){
        return await this.warehouseRepository.findAll();
    }

    async findWarehouseById(id: number): Promise<any> {
        const warehouse = await this.warehouseRepository.findById(id);
        return warehouse;
    }

    async createWarehouse(warehouse: Partial<Warehouse>){
        const newWarehouse = this.warehouseRepository.create(warehouse);
        return newWarehouse;
    }

    async updateWarehouse(id: number, warehouse: Partial<Warehouse>){

        const warehouseToUpdate = await this.findWarehouseById(id);
        if(!warehouseToUpdate) throw new Error ('Warehouse not found');

        const updatedWarehouse = await this.warehouseRepository.update(id, warehouse);
        return updatedWarehouse;
    }
}