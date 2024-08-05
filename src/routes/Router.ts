import { Router } from 'express';
import { warehouseRouter } from './';
import driverRouter from './driver.router';

const router = Router();

router.use('/warehouses', warehouseRouter);
router.use('/drivers', driverRouter);

export default router;