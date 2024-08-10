import { inject, injectable } from "tsyringe";
import { Shipment } from "../models";
import ShipmentRepository from "../repositories/shipment.repository";

@injectable()
export class ShipmentService {
    constructor(@inject(ShipmentRepository) private shipmentRepository: ShipmentRepository ) {}

    async findAllShipments(): Promise<Shipment[]>{
        return this.shipmentRepository.findAll();
    }

    async findShipmentById(id: number): Promise<Shipment|null>{
        return await this.shipmentRepository.findById(id);
    }

    async createShipment(shipment: Partial<Shipment>): Promise<Shipment> {
        return this.shipmentRepository.create(shipment);
    }

    async updateShipment(id: number, shipment: Partial<Shipment>): Promise<number> {
        const [affectedCount] = await this.shipmentRepository.update(id, shipment);
        return affectedCount;
    }

    async deleteShipment(id: number): Promise<number> {
        return await this.shipmentRepository.delete(id);
    }
}