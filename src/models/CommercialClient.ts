import { Tables, Columns } from '../constant/TABLES';
import { Restrictions } from '../constant/OTHERS';
import { ICommercialClients } from '../interfaces/Tables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import IvaCondition from './IvaCondition';

type CommercialClientCreationAttributes = Optional<ICommercialClients, 'id'>;

class CommercialClient extends Model<ICommercialClients, CommercialClientCreationAttributes> { }

CommercialClient.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    document_type: {
        type: DataTypes.INTEGER
    },
    document_number: {
        type: DataTypes.STRING
    },
    business_name: {
        type: DataTypes.STRING
    },
    fantasie_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    iva_condition_id: {
        type: DataTypes.INTEGER
    },
    direction: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    activity_description: {
        type: DataTypes.STRING
    },
    is_legal_person: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    observations: {
        type: DataTypes.TEXT("long")
    }

}, {
    sequelize,
    tableName: Tables.COMMERCIAL_CLIENTS,
    timestamps: true,
    indexes: [
        { fields: [Columns.commercialClients.document_number], name: 'UQ_clients_documentNumber', unique: true }
    ]
})

IvaCondition.hasMany(CommercialClient, {
    foreignKey: Columns.commercialClients.iva_condition_id,
    sourceKey: Columns.ivaConditions.id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

CommercialClient.belongsTo(IvaCondition, {
    foreignKey: Columns.commercialClients.iva_condition_id,
    targetKey: Columns.ivaConditions.id
})



export = CommercialClient