import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { Op } from 'sequelize';
import JsReport from 'jsreport-core';
import { promisify } from 'util';
import { ICommercialClients } from '../../../interfaces/Tables';
import Client from '../../../models/CommercialClient';
import IvaCondition from '../../../models/IvaCondition';
import AfipCrt from '../../../models/AfipCrt';
import { AfipClass } from '../../../utils/classes/AfipClass';
import { base64Encode } from '../../../utils/functions/base64Encode';
import moment from 'moment';
import OperativeClient from '../../../models/OperativeClient';
import Team from '../../../models/Team';
import ClientType from '../../../models/ClientType';

export = () => {
  const upsert = async (commercialClient: ICommercialClients) => {
    if (commercialClient.id) {
      return await Client.update(commercialClient, {
        where: { id: commercialClient.id },
      });
    } else {
      await Client.create(commercialClient);
    }
  };

  const list = async (
    isAdmin: boolean,
    userId: number,
    page: number,
    text?: string,
  ) => {
    const ITEMS_PER_PAGE = 5;

    const offset = ((page || 1) - 1) * ITEMS_PER_PAGE;
    const { count, rows } = await Client.findAndCountAll({
      where: {
        [Op.or]: [
          { business_name: { [Op.substring]: text } },
          { fantasie_name: { [Op.substring]: text } },
          { document_number: { [Op.substring]: text } },
          { email: { [Op.substring]: text } },
        ],
      },
      include: [
        {
          model: OperativeClient,
          include: [IvaCondition, Team, ClientType],
          required: false,
        },
        IvaCondition,
      ],
      offset: offset,
      limit: ITEMS_PER_PAGE,
    });

    return {
      totalItems: count,
      itemsPerPage: ITEMS_PER_PAGE,
      items: rows,
    };
  };

  const allList = async () => {
    return await Client.findAll();
  };

  const remove = async (idClient: number) => {
    return await Client.destroy({ where: { id: idClient } });
  };

  const getClientDataTax = async (documentNumber: number) => {
    const enabledCertificate = await AfipCrt.findOne({
      where: { enabled: true },
    });
    const afipObject = new AfipClass(
      Number(enabledCertificate?.dataValues.document_number) || 0,
      enabledCertificate?.dataValues.crt_file || '',
      enabledCertificate?.dataValues.key_file || '',
      true,
    );
    const dataFiscal = await afipObject.getDataCUIT(documentNumber);
    return dataFiscal;
  };

  const getTaxProof = async (documentNumber: number, isMono: boolean) => {
    const clientDataTax = await getClientDataTax(documentNumber);
    let layoutUrl = '';
    isMono
      ? (layoutUrl = path.join('views', 'reports', 'clientTaxData', 'mono.ejs'))
      : (layoutUrl = path.join(
          'views',
          'reports',
          'clientTaxData',
          'general.ejs',
        ));
    const myCss = fs.readFileSync(
      path.join('public', 'css', 'bootstrap.min.css'),
      'utf8',
    );
    const logoAfip = base64Encode(path.join('public', 'images', 'AFIP1.png'));
    const logo = base64Encode(path.join('public', 'images', 'logo_long.png'));
    const dataReport = {
      style: `<style>${myCss}</style>`,
      logo: 'data:image/png;base64,' + logo,
      logoAfip: 'data:image/png;base64,' + logoAfip,
      clientDataTax: clientDataTax.data,
      date: moment(new Date()).format('DD/MM/YYYY'),
    };
    const jsReport = JsReport({
      extensions: {
        'chrome-pdf': {
          launchOptions: {
            args: ['--no-sandbox'],
          },
        },
      },
    });

    jsReport.use(require('jsreport-chrome-pdf')());
    const writeFileAsync = promisify(fs.writeFile);
    const fileName = `TaxProof - ${
      Date.now() + '-' + Math.round(Math.random() * 1e9)
    }.pdf`;
    const location = path.join('public', 'reports', fileName);

    const htmlGenerated = await ejs.renderFile(layoutUrl, dataReport);

    await jsReport.init();
    return jsReport
      .render({
        template: {
          content: htmlGenerated,
          name: 'clientDataTax',
          engine: 'none',
          recipe: 'chrome-pdf',
          chrome: {
            landscape: false,
            format: 'A4',
            scale: 0.8,
            displayHeaderFooter: false,
          },
        },
      })
      .then(async (out) => {
        setTimeout(() => {
          fs.unlinkSync(location);
        }, 5000);
        await writeFileAsync(location, out.content);
        await jsReport.close();
        return {
          filePath: location,
          fileName: fileName,
        };
      })
      .catch((error) => {
        throw Error(error);
      });
  };

  return {
    upsert,
    list,
    remove,
    getClientDataTax,
    getTaxProof,
    allList,
  };
};
