import { container } from 'tsyringe';
import WarehouseRepository from '../repositories/warehouse.repository';
import { WarehouseService } from '../services/warehouse.service';
import { DriverService } from '../services/driver.service';

container.registerSingleton<WarehouseRepository>(WarehouseRepository);
container.registerSingleton<WarehouseService>(WarehouseService);

container.registerSingleton<DriverService>(DriverService);