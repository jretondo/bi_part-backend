import {  IProductPyme } from '../interfaces/Tables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import { Columns, Tables } from '../constant/TABLES';
import Admin from './Admin';
import { Restrictions } from '../constant/OTHERS';
import GrossIncome from './GrossIncome';
import MonotributoTypes from './MonotributoTypes';
import ServiceType from './ServiceType';

type ProductPymeCreationAttributes = Optional<IProductPyme, 'id'>;

class ProductPyme extends Model<IProductPyme, ProductPymeCreationAttributes> { }

ProductPyme.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    gross_income_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    monotributo_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    service_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    social_security: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    domestic_service: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    operative_taxes_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    operative_domestic_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    operative_onboard_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    tableName: Tables.PRODUCT_PYME,
    timestamps: false
})

GrossIncome.hasMany(ProductPyme, {
    foreignKey: Columns.productPyme.gross_income_id,
    sourceKey: Columns.grossIncome.id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.SET_NULL
})

ProductPyme.belongsTo(GrossIncome, {
    foreignKey: Columns.productPyme.gross_income_id,
    targetKey: Columns.grossIncome.id
})

MonotributoTypes.hasMany(ProductPyme, {
    foreignKey: Columns.productPyme.monotributo_type_id,
    sourceKey: Columns.monotributoTypes.id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.SET_NULL
})

ProductPyme.belongsTo(MonotributoTypes, {
    foreignKey: Columns.productPyme.monotributo_type_id,
    targetKey: Columns.monotributoTypes.id
})

ServiceType.hasMany(ProductPyme, {
    foreignKey: Columns.productPyme.service_type_id,
    sourceKey: Columns.serviceType.id,
    onDelete: Restrictions.SET_NULL,
    onUpdate: Restrictions.SET_NULL
})

ProductPyme.belongsTo(ServiceType, {
    foreignKey: Columns.productPyme.service_type_id,
    targetKey: Columns.serviceType.id
})

export = ProductPyme