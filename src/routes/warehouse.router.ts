import { Router } from 'express';
import { WarehouseController } from '../controllers/warehouse.controller';

export const warehouseRouter: Router = Router();

warehouseRouter.get('/', WarehouseController.findAllWarehouses);
warehouseRouter.get('/:id', WarehouseController.findWarehouseById);
warehouseRouter.post('/', WarehouseController.createWarehouse);
warehouseRouter.patch('/:id', WarehouseController.updateWarehouse);
warehouseRouter.delete('/:id', WarehouseController.deleteWarehouse);