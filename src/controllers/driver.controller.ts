import { container } from 'tsyringe'
import { DriverService } from '../services/driver.service';
import { Request, Response } from 'express';
import { AppError } from '../helpers/handleError.helper';
import { Driver } from '../models';

export class DriverController {

    static async findAllDrivers(_: Request, res: Response): Promise<void> {
        try {
            const driverService: DriverService = container.resolve(DriverService);
            const drivers: Driver[] = await driverService.findAllDrivers();

            if(!drivers.length) {
                res.status(200).json({ message: 'There are no drivers found' });
                return;
            }

            res.status(200).json({ message: 'Drivers succesfully fetched', data: drivers })

        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async findOneDriver(req: Request, res: Response):Promise<void>{
        try {
            const driverService: DriverService = container.resolve(DriverService);

            const { id } = req.params;

            const driver: Driver|null = await driverService.findDriverById(+id);

            if(!driver) throw new AppError(404, `Driver with id ${id} not found`);

            res.status(200).json({ message: 'Driver succesfully fetched', data: driver });
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async createDriver(req: Request, res: Response): Promise<void> {
        try {
            const driverService: DriverService = container.resolve(DriverService);

            const driver: Partial<Driver> = req.body;

            if(!driver.name) throw new AppError(400, 'Name is required');

            const newDriver: Partial<Driver> = await driverService.createDriver(driver);

            res.status(201).json({ message: 'Driver succesfully created', data: newDriver });
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async updateDriver( req: Request, res: Response ): Promise<void> {
        try {
            const driverService: DriverService = container.resolve(DriverService);
            const { id } = req.params;
            const driver = req.body;

            const updatedRows: number = await driverService.updateDriver(+id, driver);

            if(!updatedRows) throw new AppError(404, `Driver with id ${id} was not found`);

            const updatedDriver: Driver|null = await driverService.findDriverById(+id);
            res.status(200).json({ message: 'Driver updated succesfully', data: updatedDriver });
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async deleteDriver(req: Request, res: Response): Promise<void> {
        try {
            const driverService: DriverService = container.resolve(DriverService);

            const { id } = req.params;
            const deletedRows = await driverService.deleteDriver(+id);

            if(!deletedRows) throw new AppError (404, `Driver with id ${id} was not found`);

            res.status(200).json({ message: `Driver with id ${id} has beed deleted`})
        } catch (error: any) {
            console.error(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
        
    }
}