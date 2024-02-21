import { IGrossIncome } from '../../../interfaces/Tables';
import GrossIncome from '../../../models/GrossIncome';

export = () => {
    const upsert = async (body: IGrossIncome) => {
        const {
            id,
            name,
            description
        } = body;
        if (id) {
            return await GrossIncome.update({
                name,
                description
            }, {
                where: {
                    id
                }
            });
        } else {
            return await GrossIncome.create({
                name,
                description
            });
        }
    }

    const getList = async () => {
        return await GrossIncome.findAll();
    }

    const get = async (idGrossIncome: number) => {
        return await GrossIncome.findAll({ where: { id: idGrossIncome } });
    }

    return {
        upsert,
        getList,
        get
    };
}