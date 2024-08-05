import { Router } from 'express';
import { warehouseRouter } from './';

const router = Router();

router.use('/warehouses', warehouseRouter)

export default router;