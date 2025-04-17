import { IProductPyme } from '../../../interfaces/Tables';
import OperativeClient from '../../../models/OperativeClient';
import ProductPyme from '../../../models/ProductPyme';

export = () => {
  const upsert = async (body: IProductPyme) => {
    const { id, name } = body;
    if (id) {
      return await ProductPyme.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        },
      );
    } else {
      return await ProductPyme.create({
        name,
      });
    }
  };

  const getList = async () => {
    return await ProductPyme.findAll();
  };

  const get = async (idProductPyme: number) => {
    return await ProductPyme.findAll({ where: { id: idProductPyme } });
  };

  const deleteProductPyme = async (idProductPyme: number) => {
    const operativeClient = await OperativeClient.findOne({
      where: { product_pyme_id: idProductPyme },
    });
    if (operativeClient) {
      throw new Error(
        'No se puede eliminar el producto Pyme. El producto pyme está en uso',
      );
    }
    return await ProductPyme.destroy({ where: { id: idProductPyme } });
  };

  return {
    upsert,
    getList,
    get,
    deleteProductPyme,
  };
};
