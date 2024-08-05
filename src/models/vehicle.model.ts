import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Driver } from "./driver.model";
import { Shipment } from "./shipment.model";
import { Warehouse } from "./warehouse.model";

@Table({
    tableName: 'vehicles',
    timestamps: true
})
export class Vehicle extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
    })
    model!: string;

    @Column({
        type: DataType.INTEGER, 
    })
    year!: number;

    @ForeignKey(() => Driver)
    @Column({
        type: DataType.INTEGER,
        field: 'driver_id'
    })
    driverId!: number;

    @BelongsTo(() => Driver)
    driver!: Driver

    @HasMany(() => Shipment)
    shipments!: Shipment[];

    @HasMany(() => Warehouse)
    warehouses!: Warehouse[];
}