import { IDivision } from '../../../interfaces/Tables';
import Division from '../../../models/Division';
import OperativeClient from '../../../models/OperativeClient';

export = () => {
  const upsert = async (body: IDivision) => {
    const { id, name, description } = body;
    if (id) {
      return await Division.update(
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
      return await Division.create({
        name,
        description,
      });
    }
  };

  const getList = async () => {
    return await Division.findAll();
  };

  const get = async (idDivision: number) => {
    return await Division.findAll({ where: { id: idDivision } });
  };

  const deleteDivision = async (id: number) => {
    const operativeClient = await OperativeClient.findOne({
      where: { division_id: id },
    });
    if (operativeClient) {
      throw new Error(
        'No se puede eliminar la division. La division está en uso',
      );
    }
    return await Division.destroy({ where: { id } });
  };

  return {
    upsert,
    getList,
    get,
    deleteDivision,
  };
};
