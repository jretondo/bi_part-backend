import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import { IClientType } from "../interfaces/Tables";
import { Tables } from "../constant/TABLES";

type ClientTypeCreationAttributes = Optional<IClientType, 'id'>;

class ClientType extends Model<IClientType, ClientTypeCreationAttributes> { }

ClientType.init({
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
    tableName: Tables.CLIENT_TYPES
})

export = ClientType