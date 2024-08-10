import { inject, injectable } from "tsyringe";
import { Vehicle } from "../models";
import VehicleRepository from "../repositories/vehicle.repository";

@injectable()
export class VehicleService {
    constructor(@inject(VehicleRepository) private vehicleRepository: VehicleRepository ) {}

    async findAllVehicles(): Promise<Vehicle[]>{
        return this.vehicleRepository.findAll();
    }

    async findVehicleById(id: number): Promise<Vehicle|null>{
        return await this.vehicleRepository.findById(id);
    }

    async createVehicle(vehicle: Partial<Vehicle>): Promise<Vehicle> {
        return this.vehicleRepository.create(vehicle);
    }

    async updateVehicle(id: number, vehicle: Partial<Vehicle>): Promise<number> {
        const [affectedCount] = await this.vehicleRepository.update(id, vehicle);
        return affectedCount;
    }

    async deleteVehicle(id: number): Promise<number> {
        return await this.vehicleRepository.delete(id);
    }
}