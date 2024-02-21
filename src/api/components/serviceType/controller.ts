import { IServiceType } from '../../../interfaces/Tables';
import ServiceType from '../../../models/ServiceType';

export = () => {
    const upsert = async (body: IServiceType) => {
        const {
            id,
            name,
            description
        } = body;
        if (id) {
            return await ServiceType.update({
                name,
                description
            }, {
                where: {
                    id
                }
            });
        } else {
            return await ServiceType.create({
                name,
                description
            });
        }
    }

    const getList = async () => {
        return await ServiceType.findAll();
    }

    const get = async (idGrossIncome: number) => {
        return await ServiceType.findAll({ where: { id: idGrossIncome } });
    }

    return {
        upsert,
        getList,
        get
    };
}