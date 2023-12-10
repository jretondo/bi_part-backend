import path from 'path';
import ejs from 'ejs';
import sendEmail from './sendmail';
import Colors from '../../data/Colors.json';
import Links from '../../data/Links.json';
import Names from '../../data/Names.json';

export const confirmClient = async (
    userName: string,
    clientName: string,
    email: string,
    subject: string,
    link: string
): Promise<any> => {

    const data = {
        Colors,
        Links,
        Names,
        redirectButton: link,
        textButton: "Confirmar a " + clientName,
        clientName,
        userName,
    };

    return new Promise((resolve, reject) => {
        ejs.renderFile(path.join("views", "emails", "Templates", "userConfirmation.ejs"), data, async (err, data) => {
            if (err) {
                console.error(err);
                resolve(false);
            } else {
                try {
                    resolve(await sendEmail(email, subject, data))
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            }
        })
    });
}