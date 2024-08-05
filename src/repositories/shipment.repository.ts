import { injectable } from "tsyringe";
import { Shipment } from "../models/shipment.model";

@injectable()
export default class ShipmentRepository{
    async findAll(){
        return await Shipment.findAll();
    }

    async findById(id: number){
        return await Shipment.findByPk(id);
    }

    async create(shipment: Partial<Shipment>){
        return await Shipment.create(shipment);
    }

    async update(id: number, shipment: Partial<Shipment>){
        return await Shipment.update(shipment, { where: { id } });
    }

    async delete(id: number) {
        return await Shipment.destroy({ where: { id }});
    }
}