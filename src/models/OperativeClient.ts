import { Tables, Columns } from '../constant/TABLES';
import { Restrictions } from '../constant/OTHERS';
import { IOperativeClients } from '../interfaces/Tables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import IvaCondition from './IvaCondition';
import CommercialClient from './CommercialClient';
import Admin from './Admin';
import GrossIncome from './GrossIncome';
import MonotributoTypes from './MonotributoTypes';
import ServiceType from './ServiceType';
import Team from './Team';

type OperativeClientCreationAttributes = Optional<IOperativeClients, 'id'>;

class OperativeClient extends Model<IOperativeClients, OperativeClientCreationAttributes> { }

OperativeClient.init({
    commercial_client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    born_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    client_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    monotributo_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    balance: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    physical_person: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    social_security: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    social_security_rank: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    gross_income_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    vat_rank: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    domestic_service: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    service_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    observations: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    client_check: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    client_check_update: {
        type: DataTypes.DATE,
        allowNull: true
    },
    admin_check: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    admin_check_update: {
        type: DataTypes.DATE,
        allowNull: true
    },
    verification_code: {
        type: DataTypes.STRING(100),
        allowNull: true
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

GrossIncome.hasMany(OperativeClient, {
    foreignKey: Columns.operativeClients.gross_income_id,
    sourceKey: Columns.grossIncome.id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.SET_NULL
})

OperativeClient.belongsTo(GrossIncome, {
    foreignKey: Columns.operativeClients.gross_income_id,
    targetKey: Columns.grossIncome.id
})

MonotributoTypes.hasMany(OperativeClient, {
    foreignKey: Columns.operativeClients.monotributo_type_id,
    sourceKey: Columns.monotributoTypes.id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.SET_NULL
})

OperativeClient.belongsTo(MonotributoTypes, {
    foreignKey: Columns.operativeClients.monotributo_type_id,
    targetKey: Columns.monotributoTypes.id
})

ServiceType.hasMany(OperativeClient, {
    foreignKey: Columns.operativeClients.service_type_id,
    sourceKey: Columns.serviceType.id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.SET_NULL
})

OperativeClient.belongsTo(ServiceType, {
    foreignKey: Columns.operativeClients.service_type_id,
    targetKey: Columns.serviceType.id
})

Team.hasMany(OperativeClient, {
    foreignKey: Columns.operativeClients.team_id,
    sourceKey: Columns.teams.id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.SET_NULL
})

OperativeClient.belongsTo(Team, {
    foreignKey: Columns.operativeClients.team_id,
    targetKey: Columns.teams.id
})
export = OperativeClient
