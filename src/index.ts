import express, { NextFunction } from "express";
import dotenv from 'dotenv';
import sequelize from "./config/db";
import router from "./routes/Router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', router);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected succesfuly');

        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

startServer();