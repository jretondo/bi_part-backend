import { IProductPyme } from '../interfaces/Tables';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import { Tables } from '../constant/TABLES';

type ProductPymeCreationAttributes = Optional<IProductPyme, 'id'>;

class ProductPyme extends Model<IProductPyme, ProductPymeCreationAttributes> {}

ProductPyme.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: Tables.PRODUCT_PYME,
    timestamps: false,
  },
);

export = ProductPyme;
