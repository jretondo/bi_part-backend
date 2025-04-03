import { Tables, Columns } from '../constant/TABLES';
import { Restrictions } from '../constant/OTHERS';
import { IOperativeClients } from '../interfaces/Tables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import IvaCondition from './IvaCondition';
import CommercialClient from './CommercialClient';
import Team from './Team';
import ClientType from './ClientType';
import GrossIncome from './GrossIncome';
import MonotributoTypes from './MonotributoTypes';
import ServiceType from './ServiceType';

type OperativeClientCreationAttributes = Optional<IOperativeClients, 'id'>;

class OperativeClient extends Model<
  IOperativeClients,
  OperativeClientCreationAttributes
> {}

OperativeClient.init(
  {
    commercial_client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    document_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    document_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    business_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fantasie_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    iva_condition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direction: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    activity_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_legal_person: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    born_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    client_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    product_pyme_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    division_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    observations: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    balance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    balance_close: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cupon: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    invoice: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    system: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sociality: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    team_balance_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    physical_person: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    risk: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    team_risk_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gross_income_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    monotributo_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    service_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    social_security: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    domestic_service: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    operative_taxes_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operative_domestic_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operative_onboard_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: Tables.OPERATIVE_CLIENTS,
    timestamps: true,
    indexes: [
      {
        fields: [Columns.operativeClients.document_number],
        name: 'UQ_clients_documentNumber',
        unique: true,
      },
    ],
  },
);

IvaCondition.hasMany(OperativeClient, {
  foreignKey: Columns.operativeClients.iva_condition_id,
  sourceKey: Columns.ivaConditions.id,
  onDelete: Restrictions.CASCADE,
  onUpdate: Restrictions.CASCADE,
});

OperativeClient.belongsTo(IvaCondition, {
  foreignKey: Columns.operativeClients.iva_condition_id,
  targetKey: Columns.ivaConditions.id,
});

CommercialClient.hasMany(OperativeClient, {
  foreignKey: Columns.operativeClients.commercial_client_id,
  sourceKey: Columns.commercialClients.id,
  onDelete: Restrictions.CASCADE,
  onUpdate: Restrictions.CASCADE,
});

OperativeClient.belongsTo(CommercialClient, {
  foreignKey: Columns.operativeClients.commercial_client_id,
  targetKey: Columns.commercialClients.id,
});

Team.hasMany(OperativeClient, {
  foreignKey: Columns.operativeClients.team_id,
  sourceKey: Columns.teams.id,
  onDelete: Restrictions.SET_NULL,
  onUpdate: Restrictions.SET_NULL,
});

OperativeClient.belongsTo(Team, {
  foreignKey: Columns.operativeClients.team_id,
  targetKey: Columns.teams.id,
});

ClientType.hasMany(OperativeClient, {
  foreignKey: Columns.operativeClients.client_type_id,
  sourceKey: Columns.clientTypes.id,
  onDelete: Restrictions.SET_NULL,
  onUpdate: Restrictions.SET_NULL,
});

OperativeClient.belongsTo(ClientType, {
  foreignKey: Columns.operativeClients.client_type_id,
  targetKey: Columns.clientTypes.id,
});

GrossIncome.hasMany(OperativeClient, {
  foreignKey: Columns.productPyme.gross_income_id,
  sourceKey: Columns.grossIncome.id,
  onDelete: Restrictions.SET_NULL,
  onUpdate: Restrictions.SET_NULL,
});

OperativeClient.belongsTo(GrossIncome, {
  foreignKey: Columns.productPyme.gross_income_id,
  targetKey: Columns.grossIncome.id,
});

MonotributoTypes.hasMany(OperativeClient, {
  foreignKey: Columns.productPyme.monotributo_type_id,
  sourceKey: Columns.monotributoTypes.id,
  onDelete: Restrictions.SET_NULL,
  onUpdate: Restrictions.SET_NULL,
});

OperativeClient.belongsTo(MonotributoTypes, {
  foreignKey: Columns.productPyme.monotributo_type_id,
  targetKey: Columns.monotributoTypes.id,
});

ServiceType.hasMany(OperativeClient, {
  foreignKey: Columns.productPyme.service_type_id,
  sourceKey: Columns.serviceType.id,
  onDelete: Restrictions.SET_NULL,
  onUpdate: Restrictions.SET_NULL,
});

OperativeClient.belongsTo(ServiceType, {
  foreignKey: Columns.productPyme.service_type_id,
  targetKey: Columns.serviceType.id,
});

export = OperativeClient;
