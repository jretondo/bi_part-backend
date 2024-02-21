import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import { ITeam } from "../interfaces/Tables";
import { Tables } from "../constant/TABLES";

type MonotributoTypesCreationAttributes = Optional<ITeam, 'id'>;

class MonotributoTypes extends Model<ITeam, MonotributoTypesCreationAttributes> { }

MonotributoTypes.init({
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
    tableName: Tables.MONOTRIBUTO_TYPES
})

export = MonotributoTypes