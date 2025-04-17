import { IMonotributoTypes } from '../../../interfaces/Tables';
import MonotributoTypes from '../../../models/MonotributoTypes';
import OperativeClient from '../../../models/OperativeClient';

export = () => {
  const upsert = async (body: IMonotributoTypes) => {
    const { id, name, description } = body;
    if (id) {
      return await MonotributoTypes.update(
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
      return await MonotributoTypes.create({
        name,
        description,
      });
    }
  };

  const getList = async () => {
    return await MonotributoTypes.findAll();
  };

  const get = async (idType: number) => {
    return await MonotributoTypes.findAll({ where: { id: idType } });
  };

  const deleteMonotributo = async (id: number) => {
    const operativeClient = await OperativeClient.findOne({
      where: { monotributo_type_id: id },
    });
    if (operativeClient) {
      throw new Error(
        'No se puede eliminar el tipo. El tipo de monotributo está en uso',
      );
    }
    return await MonotributoTypes.destroy({ where: { id } });
  };

  return {
    upsert,
    getList,
    get,
    deleteMonotributo,
  };
};
