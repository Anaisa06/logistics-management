import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Vehicle } from "./vehicle.model";
import { Shipment } from "./shipment.model";
import { Warehouse } from "./warehouse.model";

@Table({
    tableName: "drivers",
    timestamps: true
})
export class Driver extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING(100)
    })
    name!: string;

    @HasMany(() => Vehicle)
    vehicles!: Vehicle[];

    @HasMany(() => Shipment)
    shipments!: Shipment[];

    @ForeignKey(() => Warehouse)
    @Column({
        type: DataType.INTEGER,
        field: 'warehouse_id'
    })
    warehouseId!: number;

    @BelongsTo(() => Warehouse)
    warehouse!: Warehouse 
}