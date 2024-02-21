import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import { ITeam } from "../interfaces/Tables";
import { Tables } from "../constant/TABLES";

type TeamCreationAttributes = Optional<ITeam, 'id'>;

class Team extends Model<ITeam, TeamCreationAttributes> { }

Team.init({
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
    tableName: Tables.TEAMS
})

export = Team