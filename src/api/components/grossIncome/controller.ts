import { IGrossIncome } from '../../../interfaces/Tables';
import GrossIncome from '../../../models/GrossIncome';
import OperativeClient from '../../../models/OperativeClient';

export = () => {
  const upsert = async (body: IGrossIncome) => {
    const { id, name, description } = body;
    if (id) {
      return await GrossIncome.update(
        {
          name,
          description,
        },
        {
          where: {
            id,
          },
        },
      );
    } else {
      return await GrossIncome.create({
        name,
        description,
      });
    }
  };

  const getList = async () => {
    return await GrossIncome.findAll();
  };

  const get = async (idGrossIncome: number) => {
    return await GrossIncome.findAll({ where: { id: idGrossIncome } });
  };

  const deleteGrossIncome = async (id: number) => {
    const operativeClient = await OperativeClient.findOne({
      where: { gross_income_id: id },
    });
    if (operativeClient) {
      throw new Error(
        'No se puede eliminar el tipo. El tipo de monotributo está en uso',
      );
    }
    return await GrossIncome.destroy({ where: { id } });
  };

  return {
    upsert,
    getList,
    get,
    deleteGrossIncome,
  };
};
