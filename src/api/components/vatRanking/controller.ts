import { IVatRanking } from '../../../interfaces/Tables';
import VatRanking from '../../../models/VatRanking';

export = () => {
    const upsert = async (body: IVatRanking) => {
        const {
            id,
            digit,
            rank
        } = body;
        if (id) {
            return await VatRanking.update({
                digit,
                rank
            }, {
                where: {
                    id
                }
            });
        } else {
            return await VatRanking.create({
                digit,
                rank
            });
        }
    }

    const getList = async () => {
        return await VatRanking.findAll();
    }

    const get = async (idTeam: number) => {
        return await VatRanking.findAll({ where: { id: idTeam } });
    }

    return {
        upsert,
        getList,
        get
    };
}