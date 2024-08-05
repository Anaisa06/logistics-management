import { container} from "tsyringe";
import { WarehouseService } from "../services/warehouse.service";
import { Request, Response } from "express";
import { AppError } from "../helpers/handleError.helper";

export class WarehouseController {
  
    static async findAllWarehouses(_ : Request, res: Response): Promise<void>{
        try {
            const warehouseService: WarehouseService = container.resolve(WarehouseService);
            const warehouses = await warehouseService.findAllWarehouses();

            if(!warehouses.length) res.status(204).json({ message: 'There are no drivers found' });
            
            res.status(200).json({ message: 'Data succesfully fetched', data: warehouses});
        } catch (error:any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async findWarehouseById(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params;
            const warehouseService = container.resolve(WarehouseService);
            const warehouse = await warehouseService.findWarehouseById(+id);

            if(!warehouse) res.status(404).json({ message: `Warehouse with id ${id} not found` });

            res.status(200).json({ message: 'Data succesfully fetched', data: warehouse });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async createWarehouse(req: Request, res: Response): Promise<void>{
        try {
            const warehouse = req.body;

            if(!warehouse.name || !warehouse.location) throw new AppError(400, 'Name and location are required') 

            const warehouseService = container.resolve(WarehouseService);

            const newWarehouse = await warehouseService.createWarehouse(warehouse);
            res.status(201).json({ message: 'Warehouse created succesfully', data: newWarehouse });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error'});
        }
    }

    static async updateWarehouse(req: Request, res: Response): Promise<void>{
        try{

            const warehouseService = container.resolve(WarehouseService);

            const { id } = req.params;
            const warehouse = req.body;
            
            await warehouseService.updateWarehouse(+id, warehouse);

            const updatedWarehouse = await warehouseService.findWarehouseById(+id);

            res.status(200).json({ message: 'Warehouse updated succesfully', data: updatedWarehouse });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async deleteWarehouse(req: Request, res: Response): Promise<void>{
        try {
            const warehouseService = container.resolve(WarehouseService);

            const { id } = req.params;
            await warehouseService.deleteWarehouse(+id);

            res.status(200).json({ message: `Warehouse with id ${id} succesfully deleted` });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }
}