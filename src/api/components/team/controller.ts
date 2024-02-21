import { ITeam } from '../../../interfaces/Tables';
import Team from '../../../models/Team';

export = () => {
    const upsert = async (body: ITeam) => {
        const {
            id,
            name,
            description
        } = body;
        if (id) {
            return await Team.update({
                name,
                description
            }, {
                where: {
                    id
                }
            });
        } else {
            return await Team.create({
                name,
                description
            });
        }
    }

    const getList = async () => {
        return await Team.findAll();
    }

    const get = async (idTeam: number) => {
        return await Team.findAll({ where: { id: idTeam } });
    }

    return {
        upsert,
        getList,
        get
    };
}