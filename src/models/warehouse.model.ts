import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Vehicle } from "./vehicle.model";
import { Shipment } from "./shipment.model";
import { Driver } from "./driver.model";

@Table({
    tableName: 'warehouses',
    timestamps: true
})
export class Warehouse extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;


    @Column({
        type: DataType.STRING(100), allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING(250), allowNull: false
    })
    location!: string;

    @ForeignKey(() => Vehicle)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: 'vehicle_id'
   
    })
    vehicleId!: number;

    @BelongsTo(() => Vehicle)
    vehicle!: Vehicle;

    @HasMany(() => Shipment)
    shipments!: Shipment[];

    @HasMany(() => Driver)
    drivers!: Driver[];
}