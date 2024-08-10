import { Router } from 'express';
import { VehicleController } from '../controllers/vehicle.controller';

const vehicleRouter = Router();

vehicleRouter.get('/', VehicleController.findAllVehicles);
vehicleRouter.get('/:id', VehicleController.findOneVehicle);
vehicleRouter.post('/', VehicleController.createVehicle);
vehicleRouter.patch('/:id', VehicleController.updateVehicle);
vehicleRouter.delete('/:id', VehicleController.deleteVehicle);

export default vehicleRouter;