import { injectable } from "tsyringe";
import { Driver } from "../models/driver.model";

@injectable()
export default class DriverRepository{
    async findAll(){
        return await Driver.findAll();
    }

    async findById(id: number){
        return await Driver.findByPk(id);
    }

    async create(driver: Partial<Driver>){
        return await Driver.create(driver);
    }

    async update(id: number, driver: Partial<Driver>){
        return await Driver.update(driver, { where: { id } });
    }

    async delete(id: number) {
        return await Driver.destroy({ where: { id }});
    }
}