import { IClientType, ITeam } from '../../../interfaces/Tables';
import ClientType from '../../../models/ClientType';

export = () => {
    const upsert = async (body: IClientType) => {
        const {
            id,
            name,
            description
        } = body;
        if (id) {
            return await ClientType.update({
                name,
                description
            }, {
                where: {
                    id
                }
            });
        } else {
            return await ClientType.create({
                name,
                description
            });
        }
    }

    const getList = async () => {
        return await ClientType.findAll();
    }

    const get = async (idClientType: number) => {
        return await ClientType.findAll({ where: { id: idClientType } });
    }

    return {
        upsert,
        getList,
        get
    };
}