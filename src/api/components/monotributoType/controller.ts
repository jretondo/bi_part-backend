import { IMonotributoTypes } from '../../../interfaces/Tables';
import MonotributoTypes from '../../../models/MonotributoTypes';

export = () => {
    const upsert = async (body: IMonotributoTypes) => {
        const {
            id,
            name,
            description
        } = body;
        if (id) {
            return await MonotributoTypes.update({
                name,
                description
            }, {
                where: {
                    id
                }
            });
        } else {
            return await MonotributoTypes.create({
                name,
                description
            });
        }
    }

    const getList = async () => {
        return await MonotributoTypes.findAll();
    }

    const get = async (idType: number) => {
        return await MonotributoTypes.findAll({ where: { id: idType } });
    }

    return {
        upsert,
        getList,
        get
    };
}