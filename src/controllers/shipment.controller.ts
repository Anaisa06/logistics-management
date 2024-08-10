import '../config/container';
import { Request, Response } from 'express';
import { AppError } from '../helpers/handleError.helper';
import { Shipment } from '../models';
import { container } from 'tsyringe';
import { ShipmentService } from '../services/shipment.services';

export class ShipmentController {

    static async findAllShipments(_: Request, res: Response): Promise<void> {
        try {
            const shipmentService: ShipmentService = container.resolve(ShipmentService);
            const shipments: Shipment[] = await shipmentService.findAllShipments();

            if(!shipments.length) {
                res.status(200).json({ message: 'There are no shipments found' });
                return;
            }

            res.status(200).json({ message: 'shipments succesfully fetched', data: shipments })

        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async findOneShipment(req: Request, res: Response):Promise<void>{
        try {
            const shipmentService: ShipmentService = container.resolve(ShipmentService);

            const { id } = req.params;

            const shipment: Shipment|null = await shipmentService.findShipmentById(+id);

            if(!shipment) throw new AppError(404, `shipment with id ${id} not found`);

            res.status(200).json({ message: 'shipment succesfully fetched', data: shipment });
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async createShipment(req: Request, res: Response): Promise<void> {
        try {
            const shipmentService: ShipmentService = container.resolve(ShipmentService);

            const shipment: Partial<Shipment> = req.body;

            if(!shipment.item || !shipment.quantity || !shipment.driverId ||!shipment.warehouseId || !shipment.vehicleId) throw new AppError(400, 'All fields are required');

            const newShipment: Partial<Shipment> = await shipmentService.createShipment(shipment);

            res.status(201).json({ message: 'shipment succesfully created', data: newShipment });
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async updateShipment( req: Request, res: Response ): Promise<void> {
        try {
            const shipmentService: ShipmentService = container.resolve(ShipmentService);
            const { id } = req.params;
            const shipment = req.body;

            const updatedRows: number = await shipmentService.updateShipment(+id, shipment);

            if(!updatedRows) throw new AppError(404, `shipment with id ${id} was not found`);

            const updatedShipment: Shipment|null = await shipmentService.findShipmentById(+id);
            res.status(200).json({ message: 'shipment updated succesfully', data: updatedShipment });
        } catch (error: any) {
            console.log(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
    }

    static async deleteShipment(req: Request, res: Response): Promise<void> {
        try {
            const shipmentService: ShipmentService = container.resolve(ShipmentService);

            const { id } = req.params;
            const deletedRows = await shipmentService.deleteShipment(+id);

            if(!deletedRows) throw new AppError (404, `shipment with id ${id} was not found`);

            res.status(200).json({ message: `shipment with id ${id} has beed deleted`})
        } catch (error: any) {
            console.error(error)
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
        }
        
    }
}