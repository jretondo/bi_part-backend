import { IClientType, ITeam } from '../../../interfaces/Tables';
import ClientType from '../../../models/ClientType';
import OperativeClient from '../../../models/OperativeClient';

export = () => {
  const upsert = async (body: IClientType) => {
    const { id, name, description } = body;
    if (id) {
      return await ClientType.update(
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
      return await ClientType.create({
        name,
        description,
      });
    }
  };

  const getList = async () => {
    return await ClientType.findAll();
  };

  const get = async (idClientType: number) => {
    return await ClientType.findAll({ where: { id: idClientType } });
  };

  const deleteClientType = async (idClientType: number) => {
    const operativeClient = await OperativeClient.findOne({
      where: { client_type_id: idClientType },
    });
    if (operativeClient) {
      throw new Error(
        'No se puede eliminar el cliente. El tipo de cliente está en uso',
      );
    }
    return await ClientType.destroy({ where: { id: idClientType } });
  };

  return {
    upsert,
    getList,
    get,
    deleteClientType,
  };
};
