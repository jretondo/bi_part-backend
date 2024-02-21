import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import { ISocialSecurity } from "../interfaces/Tables";
import { Tables } from "../constant/TABLES";

type SocialSecurityCreationAttributes = Optional<ISocialSecurity, 'id'>;

class SocialSecurity extends Model<ISocialSecurity, SocialSecurityCreationAttributes> { }

SocialSecurity.init({
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
    tableName: Tables.SOCIAL_SECURITY,
    timestamps: false
})

SocialSecurity.sync({ alter: true })

export = SocialSecurity