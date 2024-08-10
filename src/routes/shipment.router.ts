import { Router } from 'express';
import { ShipmentController } from '../controllers/shipment.controller';

const shipmentRouter = Router();

shipmentRouter.get('/', ShipmentController.findAllShipments);
shipmentRouter.get('/:id', ShipmentController.findOneShipment);
shipmentRouter.post('/', ShipmentController.createShipment);
shipmentRouter.patch('/:id', ShipmentController.updateShipment);
shipmentRouter.delete('/:id', ShipmentController.deleteShipment);

export default shipmentRouter;