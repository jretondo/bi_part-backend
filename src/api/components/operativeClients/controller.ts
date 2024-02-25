import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { Op } from 'sequelize';
import JsReport from 'jsreport-core';
import { promisify } from 'util';
import moment from 'moment';
import { IOperativeClients } from '../../../interfaces/Tables';
import Client from '../../../models/OperativeClient';
import IvaCondition from '../../../models/IvaCondition';
import AfipCrt from '../../../models/AfipCrt';
import { AfipClass } from '../../../utils/classes/AfipClass';
import { base64Encode } from '../../../utils/functions/base64Encode';
import CommercialClient from '../../../models/CommercialClient';
import Admin from '../../../models/Admin';
import { confirmClient } from '../../../utils/sendEmails/confirmClient';
import { Response } from 'express';
import Colors from '../../../data/Colors.json';
import Links from '../../../data/Links.json';
import Names from '../../../data/Names.json';

export = () => {
    const upsert = async (client: IOperativeClients) => {
        if (client.id) {
            const opClient = await Client.findOne({ where: { id: client.id } })
            const userData = await Admin.findOne({ where: { id: client.user_id } })
            const uniqueCode = (Math.floor(Math.random() * 1000000)).toString()

            const link = `https://api-prod.nekoadmin.com.ar/bi-part/api/operativeClients/aceptClient/${client.id}/${uniqueCode}`

            if (opClient?.dataValues.user_id !== client.user_id) {
                await confirmClient(`${userData?.dataValues.name} ${userData?.dataValues.lastname}` || "", client.business_name || "", "jretondo90@gmail.com", "Confirmación de cliente", link)
                client.verification_code = uniqueCode
            }

            return await Client.update(client, { where: { id: client.id } })
        } else {
            const newClientBody = {
                ...client,
                client_check: false,
                client_check_update: null,
                admin_check: 0,
                admin_check_update: null,
                verification_code: ""
            }
            console.log('newClientBody :>> ', newClientBody);
            const newClient = await Client.create(newClientBody)
            const userData = await Admin.findOne({ where: { id: client.user_id } })
            if (client.user_id) {
                const uniqueCode = (Math.floor(Math.random() * 1000000)).toString()
                const link = `http://192.168.100.8:3021/api/operativeClients/aceptClient/${newClient.dataValues.id}/${uniqueCode}`
                await confirmClient(`${userData?.dataValues.name} ${userData?.dataValues.lastname}` || "", client.business_name || "", "jretondo90@gmail.com", "Confirmación de cliente", link)
                newClient.dataValues.verification_code = uniqueCode
                return await Client.update(newClient.dataValues, { where: { id: newClient.dataValues.id } })
            }
            return newClient
        }
    }

    const aceptClient = async (idClient: number, verificationCode: string, res: Response) => {
        const opClient = await Client.findOne({ where: { id: idClient } })
        if (opClient?.dataValues.verification_code === verificationCode) {
            const userData = await Admin.findOne({ where: { id: opClient?.dataValues.user_id } })
            await Client.update({ client_check: true, client_check_update: new Date() }, { where: { id: idClient } })
            const data = {
                Colors,
                Links,
                Names,
                clientName: opClient?.dataValues.business_name || "",
                userName: `${userData?.dataValues.name} ${userData?.dataValues.lastname}` || ""
            };
            res.render('emails/Templates/clientConfirmated.ejs', data);
        } else {
            res.send("El código de verificación no es correcto")
        }
    }

    const list = async (isAdmin: boolean, userId: number, page: number, text?: string) => {
        const ITEMS_PER_PAGE = 10;

        const offset = ((page || 1) - 1) * (ITEMS_PER_PAGE);
        const { count, rows } = await Client.findAndCountAll({
            where: {
                [Op.or]: [
                    { business_name: { [Op.substring]: text } },
                    { fantasie_name: { [Op.substring]: text } },
                    { document_number: { [Op.substring]: text } },
                    { email: { [Op.substring]: text } }
                ]
            },
            include: [CommercialClient, IvaCondition, Admin],
            offset: offset,
            limit: ITEMS_PER_PAGE
        });

        return {
            totalItems: count,
            itemsPerPage: ITEMS_PER_PAGE,
            items: rows
        }
    }

    const allList = async () => {
        return await Client.findAll()
    }

    const remove = async (idClient: number) => {
        return await Client.destroy({ where: { id: idClient } })
    }

    const getClientDataTax = async (documentNumber: number) => {
        const enabledCertificate = await AfipCrt.findOne({ where: { enabled: true } })
        const afipObject = new AfipClass(Number(enabledCertificate?.dataValues.document_number) || 0, enabledCertificate?.dataValues.crt_file || "", enabledCertificate?.dataValues.key_file || "", true);
        const dataFiscal = await afipObject.getDataCUIT(documentNumber);
        return dataFiscal
    }

    const getTaxProof = async (documentNumber: number, isMono: boolean) => {
        const clientDataTax = await getClientDataTax(documentNumber)
        let layoutUrl = ""
        isMono ? layoutUrl = path.join("views", "reports", "clientTaxData", "mono.ejs") : layoutUrl = path.join("views", "reports", "clientTaxData", "general.ejs");
        const myCss = fs.readFileSync(path.join("public", "css", "bootstrap.min.css"), 'utf8')
        const logoAfip = base64Encode(path.join("public", "images", "AFIP1.png"))
        const logo = base64Encode(path.join("public", "images", "logo_long.png"))
        const dataReport = {
            style: `<style>${myCss}</style>`,
            logo: 'data:image/png;base64,' + logo,
            logoAfip: 'data:image/png;base64,' + logoAfip,
            clientDataTax: clientDataTax.data,
            date: moment(new Date()).format("DD/MM/YYYY")
        }
        const jsReport = JsReport({
            extensions: {
                "chrome-pdf": {
                    "launchOptions": {
                        "args": ["--no-sandbox"]
                    }
                }
            }
        })

        jsReport.use(require('jsreport-chrome-pdf')())
        const writeFileAsync = promisify(fs.writeFile)
        const fileName = `TaxProof - ${Date.now() + '-' + Math.round(Math.random() * 1E9)}.pdf`
        const location = path.join("public", "reports", fileName)

        const htmlGenerated = await ejs.renderFile(layoutUrl, dataReport)

        await jsReport.init()
        return jsReport.render({
            template: {
                content: htmlGenerated,
                name: 'clientDataTax',
                engine: 'none',
                recipe: 'chrome-pdf',
                chrome: {
                    "landscape": false,
                    "format": "A4",
                    "scale": 0.8,
                    displayHeaderFooter: false
                }
            }
        }).then(async (out) => {
            setTimeout(() => {
                fs.unlinkSync(location);
            }, 5000);
            await writeFileAsync(location, out.content)
            await jsReport.close()
            return {
                filePath: location,
                fileName: fileName
            }
        }).catch((error) => {
            throw Error(error)
        })
    }

    return {
        upsert,
        list,
        remove,
        getClientDataTax,
        getTaxProof,
        allList,
        aceptClient
    };
}