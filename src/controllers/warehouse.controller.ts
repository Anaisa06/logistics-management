import { container} from "tsyringe";
import { WarehouseService } from "../services/warehouse.service";
import { Request, Response } from "express";

export class WarehouseController {
  
    static async findAllWarehouses(_ : Request, res: Response): Promise<void>{
        try {
            const warehouseService = container.resolve(WarehouseService);
            const warehouses = await warehouseService.findAllWarehouses();
            res.status(200).json({ message: 'Data succesfully fetched', data: warehouses});
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error in find all warehouses' });
        }
    }

    static async findWarehouseById(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params;
            const warehouseService = container.resolve(WarehouseService);
            const warehouse = await warehouseService.findWarehouseById(+id);

            if(!warehouse) res.status(404).json({ message: `Warehouse with id ${id} not found` });

            res.status(200).json({ message: 'Data succesfully fetched', data: warehouse });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in find warehouse by id' });
        }
    }

    static async createWarehouse(req: Request, res: Response): Promise<void>{
        try {
            const warehouse = req.body;

            if(!warehouse.name || !warehouse.location) res.status(400).json({ message: 'Name and location are required'});

            const warehouseService = container.resolve(WarehouseService);

            const newWarehouse = await warehouseService.createWarehouse(warehouse);
            res.status(201).json({ message: 'Warehouse created succesfully', data: newWarehouse });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in create warehouse' });
        }
    }

    static async updateWarehouse(req: Request, res: Response): Promise<void>{
        try{

            const warehouseService = container.resolve(WarehouseService);

            const { id } = req.params;
            const warehouse = req.body;
            
            const updatedRows = await warehouseService.updateWarehouse(+id, warehouse);

            if(!updatedRows) res.status(400).json({ message: 'Couldn update warehouse'});
            const updatedWarehouse = await warehouseService.findWarehouseById(+id);

            res.status(200).json({ message: 'Warehouse updated succesfully', data: updatedWarehouse });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error in update warehouse '});
        }
    }
}