import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import { IServiceType } from "../interfaces/Tables";
import { Tables } from "../constant/TABLES";

type ServiceTypeCreationAttributes = Optional<IServiceType, 'id'>;

class ServiceType extends Model<IServiceType, ServiceTypeCreationAttributes> { }

ServiceType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: Tables.SERVICE_TYPE
})

export = ServiceType