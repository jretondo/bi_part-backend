import { NextFunction, Request, Response, Router } from 'express';
import { success } from '../../../network/response';
import Controller from './index';
import secure from '../../../auth/secure';
const router = Router();

//internal Functions
const upsert = (req: Request, res: Response, next: NextFunction) => {
  Controller.upsert(req.body)
    .then(() => {
      success({ res, req, status: 201, message: 'Typo de servicio creado!' });
    })
    .catch(next);
};

const get = (req: Request, res: Response, next: NextFunction) => {
  Controller.get(req.body.user.id)
    .then((permissions: any) => {
      success({ req, res, message: permissions });
    })
    .catch(next);
};

const getList = (req: Request, res: Response, next: NextFunction) => {
  Controller.getList()
    .then((permissions: any) => {
      success({ req, res, message: permissions });
    })
    .catch(next);
};

const deleteProductPyme = (req: Request, res: Response, next: NextFunction) => {
  Controller.deleteProductPyme(Number(req.params.id))
    .then(() => {
      success({ req, res, message: 'Producto pyme eliminado!' });
    })
    .catch(next);
};

//Routes
router
  .post('/', secure(), upsert)
  .put('/', secure(), upsert)
  .get('/:id', secure(), get)
  .get('/', secure(), getList)
  .delete('/:id', secure(), deleteProductPyme);

export = router;
