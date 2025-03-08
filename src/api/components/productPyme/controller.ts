import { IProductPyme } from '../../../interfaces/Tables';
import ProductPyme from '../../../models/ProductPyme';

export = () => {
    const upsert = async (body: IProductPyme) => {
        const {
            id,
            name,
            gross_income_id,
            monotributo_type_id,
            service_type_id,
            social_security,
            domestic_service,
            operative_taxes_user_id,
            operative_domestic_user_id,
            operative_onboard_user_id
        } = body;
        if (id) {
            return await ProductPyme.update({
                name,
                gross_income_id,
                monotributo_type_id,
                service_type_id,
                social_security,
                domestic_service,
                operative_taxes_user_id,
                operative_domestic_user_id,
                operative_onboard_user_id
            }, {
                where: {
                    id
                }
            });
        } else {
            return await ProductPyme.create({
                name,
                gross_income_id,
                monotributo_type_id,
                service_type_id,
                social_security,
                domestic_service,
                operative_taxes_user_id,
                operative_domestic_user_id,
                operative_onboard_user_id
            });
        }
    }

    const getList = async () => {
        return await ProductPyme.findAll();
    }

    const get = async (idProductPyme: number) => {
        return await ProductPyme.findAll({ where: { id: idProductPyme } });
    }

    return {
        upsert,
        getList,
        get
    };
}