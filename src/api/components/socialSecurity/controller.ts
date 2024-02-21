import { ISocialSecurity } from '../../../interfaces/Tables';
import SocialSecurity from '../../../models/SocialSecurity';

export = () => {
    const upsert = async (body: ISocialSecurity) => {
        const {
            id,
            digit,
            rank
        } = body;
        if (id) {
            return await SocialSecurity.update({
                digit,
                rank
            }, {
                where: {
                    id
                }
            });
        } else {
            return await SocialSecurity.create({
                digit,
                rank
            });
        }
    }

    const getList = async () => {
        return await SocialSecurity.findAll();
    }

    const get = async (idTeam: number) => {
        return await SocialSecurity.findAll({ where: { id: idTeam } });
    }

    return {
        upsert,
        getList,
        get
    };
}