import { Tables, Columns } from '../constant/TABLES';
import { Restrictions } from '../constant/OTHERS';
import { IOperativeClients } from '../interfaces/Tables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import IvaCondition from './IvaCondition';
import CommercialClient from './CommercialClient';
import Admin from './Admin';

type OperativeClientCreationAttributes = Optional<IOperativeClients, 'id'>;

class OperativeClient extends Model<IOperativeClients, OperativeClientCreationAttributes> { }

OperativeClient.init({
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
    activity_description: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    is_legal_person: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    social_security: {
        type: DataTypes.BOOLEAN
    },
    observations: {
        type: DataTypes.TEXT("long")
    },
    commercial_client_id: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    client_check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    client_check_update: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    admin_check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    admin_check_update: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    balance: {
        type: DataTypes.BOOLEAN
    },
    is_mono: {
        type: DataTypes.BOOLEAN
    },
    verification_code: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
}, {
    sequelize,
    tableName: Tables.OPERATIVE_CLIENTS,
    timestamps: true
})

IvaCondition.hasMany(OperativeClient, {
    foreignKey: Columns.operativeClients.iva_condition_id,
    sourceKey: Columns.ivaConditions.id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

OperativeClient.belongsTo(IvaCondition, {
    foreignKey: Columns.operativeClients.iva_condition_id,
    targetKey: Columns.ivaConditions.id
})

CommercialClient.hasMany(OperativeClient, {
    foreignKey: Columns.operativeClients.commercial_client_id,
    sourceKey: Columns.commercialClients.id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

OperativeClient.belongsTo(CommercialClient, {
    foreignKey: Columns.operativeClients.commercial_client_id,
    targetKey: Columns.commercialClients.id
})

Admin.hasMany(OperativeClient, {
    foreignKey: Columns.operativeClients.user_id,
    sourceKey: Columns.operativeClients.id,
    onDelete: Restrictions.CASCADE,
    onUpdate: Restrictions.CASCADE
})

OperativeClient.belongsTo(Admin, {
    foreignKey: Columns.operativeClients.user_id,
    targetKey: Columns.operativeClients.id
})

export = OperativeClient