import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Warehouse } from "./warehouse.model";
import { Vehicle } from "./vehicle.model";
import { Driver } from "./driver.model";

@Table({
    tableName: 'shipments',
    timestamps: true
})
export class Shipment extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    item!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantity!: number;

    @ForeignKey(() => Warehouse)
    @Column({
        type: DataType.INTEGER,
        field: 'warehouse_id'        
    })
    warehouseId!: number;

    @BelongsTo(() => Warehouse)
    warehouse!: Warehouse;

    @ForeignKey(()=> Vehicle)
    @Column({
        type: DataType.INTEGER,
        field: 'vehicle_id'
    })
    vehicleId!: number;

    @BelongsTo(()=> Vehicle)
    vehicle!: Vehicle;

    @ForeignKey(()=> Driver)
    @Column({
        type: DataType.INTEGER,
        field: 'driver_id'
    })
    driverId!: number;

    @BelongsTo(()=> Driver)
    driver!: Driver;
}