import { Op } from 'sequelize';
import { ITeam } from '../../../interfaces/Tables';
import OperativeClient from '../../../models/OperativeClient';
import Team from '../../../models/Team';

export = () => {
  const upsert = async (body: ITeam) => {
    const { id, name, description } = body;
    if (id) {
      return await Team.update(
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
      return await Team.create({
        name,
        description,
      });
    }
  };

  const getList = async () => {
    return await Team.findAll();
  };

  const get = async (idTeam: number) => {
    return await Team.findAll({ where: { id: idTeam } });
  };

  const deleteTeam = async (id: number) => {
    const operativeClient = await OperativeClient.findOne({
      where: {
        [Op.or]: [
          { team_balance_id: id },
          { team_id: id },
          { team_risk_id: id },
        ],
      },
    });
    if (operativeClient) {
      throw new Error(
        'No se puede eliminar el tipo. El tipo de monotributo está en uso',
      );
    }
    return await Team.destroy({ where: { id } });
  };

  return {
    upsert,
    getList,
    get,
    deleteTeam,
  };
};
