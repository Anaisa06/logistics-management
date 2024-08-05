import { injectable } from "tsyringe";
import { Vehicle } from "../models/vehicle.model";

@injectable()
export default class VehicleRepository{
    async findAll(){
        return await Vehicle.findAll();
    }

    async findById(id: number){
        return await Vehicle.findByPk(id);
    }

    async create(vehicle: Partial<Vehicle>){
        return await Vehicle.create(vehicle);
    }

    async update(id: number, vehicle: Partial<Vehicle>){
        return await Vehicle.update(vehicle, { where: { id } });
    }

    async delete(id: number) {
        return await Vehicle.destroy({ where: { id }});
    }
}