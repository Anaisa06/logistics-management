import { container } from 'tsyringe';
import WarehouseRepository from '../repositories/warehouse.repository';
import { WarehouseService } from '../services/warehouse.service';
import { DriverService } from '../services/driver.service';
import { ShipmentService } from '../services/shipment.services';

container.registerSingleton<WarehouseRepository>(WarehouseRepository);
container.registerSingleton<WarehouseService>(WarehouseService);

container.registerSingleton<DriverService>(DriverService);

container.registerSingleton<ShipmentService>(ShipmentService);