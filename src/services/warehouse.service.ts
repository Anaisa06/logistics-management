import { injectable, inject } from "tsyringe";
import WarehouseRepository from "../repositories/warehouse.repository";
import { Warehouse } from "../models/warehouse.model";
import { HostNotFoundError } from "sequelize";
import { AppError } from "../helpers/handleError.helper";

@injectable()
export class WarehouseService {
    constructor(@inject(WarehouseRepository) private warehouseRepository: WarehouseRepository){}

    async findAllWarehouses(){
        return await this.warehouseRepository.findAll();
    }

    async findWarehouseById(id: number): Promise<Warehouse|null> {
        return await this.warehouseRepository.findById(id);
    }

    async createWarehouse(warehouse: Partial<Warehouse>): Promise<Warehouse>{
        return this.warehouseRepository.create(warehouse);
    }

    async updateWarehouse(id: number, warehouse: Partial<Warehouse>): Promise<void>{

        const warehouseToUpdate = await this.findWarehouseById(id);
        if(!warehouseToUpdate) throw new AppError (404, `Warehouse with id ${id} not found`);

        await this.warehouseRepository.update(id, warehouse);
    }

    async deleteWarehouse(id: number): Promise<void>{
        const deletedWarehouse = await this.warehouseRepository.delete(id);
        if(!deletedWarehouse) throw new AppError (404, `Warehouse with id ${id} not found`);
    }
}