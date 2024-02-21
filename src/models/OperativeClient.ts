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
        autoIncrement: true,
        primaryKey: true
    },
    born_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    document_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    document_number: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    business_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fantasie_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    iva_condition_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    direction: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    activity_description: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_legal_person: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    team_id: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    client_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    observations: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_mono: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    gross_income_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    social_security: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    social_security_rank: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    domestic_service: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    domestic_service_rank: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vat_rank: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    balance: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    commercial_client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    client_check: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    client_check_update: {
        type: DataTypes.DATE,
        allowNull: false
    },
    admin_check: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    admin_check_update: {
        type: DataTypes.DATE,
        allowNull: false
    },
    verification_code: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    tableName: Tables.OPERATIVE_CLIENTS,
    timestamps: true,
    indexes: [
        { fields: [Columns.operativeClients.document_number], name: 'UQ_clients_documentNumber', unique: true }
    ]
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