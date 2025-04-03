import { IProductPyme } from '../../../interfaces/Tables';
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

  return {
    upsert,
    getList,
    get,
  };
};
