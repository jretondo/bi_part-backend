import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import { IDivision } from "../interfaces/Tables";
import { Tables } from "../constant/TABLES";

type DivisionCreationAttributes = Optional<IDivision, 'id'>;

class Division extends Model<IDivision, DivisionCreationAttributes> { }

Division.init({
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
    tableName: Tables.DIVISIONS
})

export = Division