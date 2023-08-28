import { NextFunction, Request, Response, Router } from 'express';
import { success } from '../../../network/response';
import secure from '../../../auth/secure';
import { EModules } from '../../../constant/OTHERS';
const router = Router();

const responseSuccess = (req: Request, res: Response, next: NextFunction) => {
    success({ req, res });
}

//Routes
router
    .get("/dashboard", secure(), responseSuccess)
    .get("/users", secure(), responseSuccess)
    .get("/clients", secure(undefined, undefined, EModules.clients, 1), responseSuccess)
    .get("/certificates", secure(undefined, undefined, EModules.certificates, 1), responseSuccess)
    .get("/sellPoints", secure(undefined, undefined, EModules.sellPoints, 1), responseSuccess)
    .get("/products", secure(undefined, undefined, EModules.products, 1), responseSuccess)
    .get("/deals", secure(undefined, undefined, EModules.deals, 1), responseSuccess)
    .get("/selfEmployed", secure(undefined, undefined, EModules.selfEmployed, 1), responseSuccess)

export = router;