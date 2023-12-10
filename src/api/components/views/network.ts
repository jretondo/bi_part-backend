import { Router, NextFunction, Response, Request } from 'express';
import fs from 'fs';
import path from 'path';
import Colors from '../../../data/Colors.json';
import Links from '../../../data/Links.json';
import Names from '../../../data/Names.json';
import { IEmailSendPass } from '../../../interfaces/Others';

const router = Router();

const newAdvance = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    function base64_encode(file: any) {
        // read binary data
        var bitmap: Buffer = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return Buffer.from(bitmap).toString('base64');
    }

    const myCss = fs.readFileSync(path.join("public", "css", "style.css"), 'utf8')
    let logo64 = base64_encode(path.join("public", "images", "logo_long.png"))

    const datos2 = {
        myCss: `<style>${myCss}</style>`,
        date: "25/07/2022",
        paymentNumber: "0001-00000014",
        providerName: "RETONDO JAVIER EDGARDO",
        dni: "35092514",
        type: "TIPO DE PRUEBA",
        periods: ["JULIO/2022", "AGOSTO/2022"],
        amount: "25.236,45",
        details: "dagdagdsgdsgds sdgsd  esg s r gs gsg segsewgewsg esgewsrg ",
        logo: 'data:image/png;base64,' + logo64,
        title: "PAGO DE ADELANTO"
    }

    res.render('reports/payments/Advance.ejs', datos2);
}

const clientDataTax = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    function base64_encode(file: any) {
        // read binary data
        var bitmap: Buffer = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return Buffer.from(bitmap).toString('base64');
    }

    const myCss = fs.readFileSync(path.join("public", "css", "bootstrap.min.css"), 'utf8')
    const logoAfip = base64_encode(path.join("public", "images", "AFIP1.png"))
    const logo = base64_encode(path.join("public", "images", "logo_long.png"))


    const datos2 = {
        style: `<style>${myCss}</style>`,
        logo: 'data:image/png;base64,' + logo,
        logoAfip: 'data:image/png;base64,' + logoAfip,
    }

    res.render('reports/clientTaxData/general.ejs', datos2);
}

const clientDataTaxMono = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    function base64_encode(file: any) {
        // read binary data
        var bitmap: Buffer = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return Buffer.from(bitmap).toString('base64');
    }

    const myCss = fs.readFileSync(path.join("public", "css", "bootstrap.min.css"), 'utf8')
    const logoAfip = base64_encode(path.join("public", "images", "AFIP1.png"))
    const logo = base64_encode(path.join("public", "images", "logo_long.png"))


    const datos2 = {
        style: `<style>${myCss}</style>`,
        logo: 'data:image/png;base64,' + logo,
        logoAfip: 'data:image/png;base64,' + logoAfip,
    }

    res.render('reports/clientTaxData/mono.ejs', datos2);
}

const userConfirmation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const data = {
        Colors,
        Links,
        Names,
        redirectButton: "Ingresar al sistema",
        textButton: "Confirmar Cliente",
        clientName: "Cliente de Prueba",
    };
    res.render('emails/Templates/userConfirmation.ejs', data);
}

const clientConfirmated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const data = {
        Colors,
        Links,
        Names,
        clientName: "Cliente de Prueba",
        userName: "Usuario de Prueba"
    };
    res.render('emails/Templates/clientConfirmated.ejs', data);
}

router
    .get("/payment", newAdvance)
    .get("/clientDataTaxGeneral", clientDataTax)
    .get("/clientDataTaxMono", clientDataTaxMono)
    .get("/userConfirmation", userConfirmation)
    .get("/clientConfirmated", clientConfirmated)

export = router;