import { Router } from 'express';
import { DriverController } from '../controllers/driver.controller';

const driverRouter = Router();

driverRouter.get('/', DriverController.findAllDrivers);
driverRouter.get('/:id', DriverController.findOneDriver);
driverRouter.post('/', DriverController.createDriver);
driverRouter.patch('/:id', DriverController.updateDriver);
driverRouter.delete('/:id', DriverController.deleteDriver);

export default driverRouter;