import AuthAdmin from '../../../models/AuthAdmin';
import bcrypt from 'bcrypt';
import { passCreator } from '../../../utils/functions/passCreator';
import { sendPass } from '../../../utils/sendEmails/sendPass';
import auth from '../../../auth';
import { IAuth } from '../../../interfaces/Tables';
import Admin from '../../../models/Admin';
import UserModules from '../../../models/UserModule';

export = () => {
    const upsert = async (body: IAuth, email: string, name: string) => {
        let newAuth: IAuth;
        if (body.pass) {
            newAuth = {
                user: body.user,
                prov: body.prov,
                pass: await bcrypt.hash(body.pass, 5),
                admin_id: body.admin_id
            };
            return await AuthAdmin.update(newAuth, { where: { admin_id: body.admin_id } });
        } else {
            const newPass = await passCreator();
            newAuth = {
                id: body.id,
                user: body.user,
                prov: 1,
                pass: await bcrypt.hash(newPass, 5),
                admin_id: body.id || 0
            };
            const result = await AuthAdmin.create(newAuth);
            if (result.dataValues.id) {
                return await sendPass(body.user, name, newPass, email, "Nuevo usuario", true, false);
            } else {
                return false;
            }
        }
    }

    const recPass = async (email: string) => {
        const newPass = await passCreator();
        const userData = await Admin.findOne({ where: { email: email } });
        const idUsu = userData?.dataValues.id || 0;
        const user = userData?.dataValues.user || "";
        const data: IAuth = {
            user: user,
            prov: 1,
            pass: newPass,
            admin_id: idUsu || 0
        };
        await sendPass(userData?.dataValues.user || "", `${userData?.dataValues.name} ${userData?.dataValues.lastname}`, newPass, email, "Recuperar Contraseña", false, false);
        return await upsert(data, email, `${userData?.dataValues.name} ${userData?.dataValues.lastname}`);
    }

    const login = async (username: string, password: string) => {
        const data3 = await AuthAdmin.findAll({ where: { user: username } });
        const data2 = await Admin.findAll({ where: { user: username } });
        const modulesView = await UserModules.findAll({ where: { user_id: data2[0].dataValues.id } })
        const userData = data2[0]
        const data = {
            ...data2[0].dataValues,
            ...data3[0].dataValues
        }
        const prov = data.prov
        return bcrypt.compare(password, data.pass || "")
            .then(same => {
                if (same) {
                    return {
                        token: auth.sign(JSON.stringify(data)),
                        userData: userData,
                        provisory: prov,
                        modules: modulesView
                    }
                } else {
                    throw new Error('información invalida')
                }
            })
    }

    return {
        upsert,
        login,
        recPass
    }
}
