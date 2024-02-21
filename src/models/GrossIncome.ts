import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import { IGrossIncome, ITeam } from "../interfaces/Tables";
import { Tables } from "../constant/TABLES";

type GrossIncomeCreationAttributes = Optional<IGrossIncome, 'id'>;

class GrossIncome extends Model<IGrossIncome, GrossIncomeCreationAttributes> { }

GrossIncome.init({
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
    tableName: Tables.GROSS_INCOME
})

export = GrossIncome