import { inject, injectable } from "tsyringe";
import DriverRepository from "../repositories/driver.repository";
import { Driver } from "../models";

@injectable()
export class DriverService {
    constructor(@inject(DriverRepository) private driverRepository: DriverRepository ) {}

    async findAllDrivers(): Promise<Driver[]>{
        return this.driverRepository.findAll();
    }

    async findDriverById(id: number): Promise<Driver|null>{
        return await this.driverRepository.findById(id);
    }

    async createDriver(driver: Partial<Driver>): Promise<Driver> {
        return this.driverRepository.create(driver);
    }

    async updateDriver(id: number, driver: Partial<Driver>): Promise<number> {
        const [affectedCount] = await this.driverRepository.update(id, driver);
        return affectedCount;
    }

    async deleteDriver(id: number): Promise<number> {
        return await this.driverRepository.delete(id);
    }
}