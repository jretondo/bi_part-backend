import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import { IVatRanking } from "../interfaces/Tables";
import { Tables } from "../constant/TABLES";

type VatRankingCreationAttributes = Optional<IVatRanking, 'id'>;

class VatRanking extends Model<IVatRanking, VatRankingCreationAttributes> { }

VatRanking.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    digit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rank: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: Tables.VAT_RANKING,
    timestamps: false
})

export = VatRanking