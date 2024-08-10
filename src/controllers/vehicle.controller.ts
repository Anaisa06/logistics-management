import { container } from 'tsyringe'
import { VehicleService } from '../services/vehicle.service';
import { Request, Response } from 'express';
import { AppError } from '../helpers/handleError.helper';
import { Vehicle } from '../models';

export class VehicleController {

    static async findAllVehicles(_: Request, res: Response): Promise<void> {
        try {
            const vehicleService: VehicleService = container.resolve(VehicleService);
            const vehicles: Vehicle[] = await vehicleService.findAllVehicles();

            if(!vehicles.length) {
                res.status(200).json({ message: 'There are no vehicles found' });
                return;
            }

            res.status(200).json({ message: 'Vehicles succesfully fetched', data: vehicles })

        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async findOneVehicle(req: Request, res: Response):Promise<void>{
        try {
            const vehicleService: VehicleService = container.resolve(VehicleService);

            const { id } = req.params;

            const vehicle: Vehicle|null = await vehicleService.findVehicleById(+id);

            if(!vehicle) throw new AppError(404, `vehicle with id ${id} not found`);

            res.status(200).json({ message: 'vehicle succesfully fetched', data: vehicle });
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async createVehicle(req: Request, res: Response): Promise<void> {
        try {
            const vehicleService: VehicleService = container.resolve(VehicleService);

            const vehicle: Partial<Vehicle> = req.body;

            if(!vehicle.model || !vehicle.year ||!vehicle.driverId) throw new AppError(400, 'Model, year, and driver id are required');

            const newvehicle: Partial<Vehicle> = await vehicleService.createVehicle(vehicle);

            res.status(201).json({ message: 'vehicle succesfully created', data: newvehicle });
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async updateVehicle( req: Request, res: Response ): Promise<void> {
        try {
            const vehicleService: VehicleService = container.resolve(VehicleService);
            const { id } = req.params;
            const vehicle = req.body;

            const updatedRows: number = await vehicleService.updateVehicle(+id, vehicle);

            if(!updatedRows) throw new AppError(404, `vehicle with id ${id} was not found`);

            const updatedvehicle: Vehicle|null = await vehicleService.findVehicleById(+id);
            res.status(200).json({ message: 'vehicle updated succesfully', data: updatedvehicle });
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async deleteVehicle(req: Request, res: Response): Promise<void> {
        try {
            const vehicleService: VehicleService = container.resolve(VehicleService);

            const { id } = req.params;
            const deletedRows = await vehicleService.deleteVehicle(+id);

            if(!deletedRows) throw new AppError (404, `vehicle with id ${id} was not found`);

            res.status(200).json({ message: `vehicle with id ${id} has beed deleted`})
        } catch (error: any) {
            console.error(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
        
    }
}