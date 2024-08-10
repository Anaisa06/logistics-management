import { Router } from 'express';
import { warehouseRouter } from './';
import driverRouter from './driver.router';
import shipmentRouter from './shipment.router';
import vehicleRouter from './vehicle.router';

const router = Router();

router.use('/warehouses', warehouseRouter);
router.use('/drivers', driverRouter);
router.use('/shipments', shipmentRouter);
router.use('/vehicles', vehicleRouter);

export default router;