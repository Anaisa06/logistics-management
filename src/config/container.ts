import { container } from 'tsyringe';
import WarehouseRepository from '../repositories/warehouse.repository';
import { WarehouseService } from '../services/warehouse.service';

container.registerSingleton<WarehouseRepository>(WarehouseRepository);
container.registerSingleton<WarehouseService>(WarehouseService);