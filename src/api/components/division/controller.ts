import { IDivision } from '../../../interfaces/Tables';
import Division from '../../../models/Division';


export = () => {
    const upsert = async (body: IDivision) => {
        const {
            id,
            name,
            description
        } = body;
        if (id) {
            return await Division.update({
                name,
                description
            }, {
                where: {
                    id
                }
            });
        } else {
            return await Division.create({
                name,
                description
            });
        }
    }

    const getList = async () => {
        return await Division.findAll();
    }

    const get = async (idDivision: number) => {
        return await Division.findAll({ where: { id: idDivision } });
    }

    return {
        upsert,
        getList,
        get
    };
}