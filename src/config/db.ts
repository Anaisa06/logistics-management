import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { Warehouse, Driver, Shipment, Vehicle } from '../models/index'

dotenv.config();

const sequelize: Sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: [Warehouse, Driver, Shipment, Vehicle],
    define: {
        underscored: true 
    }
});

export default sequelize;