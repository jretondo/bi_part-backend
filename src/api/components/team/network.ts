import { NextFunction, Request, Response, Router } from 'express';
import { success } from '../../../network/response';
import Controller from './index';
import secure from '../../../auth/secure';
const router = Router();

//internal Functions
const upsert = (req: Request, res: Response, next: NextFunction) => {
  Controller.upsert(req.body)
    .then(() => {
      success({ res, req, status: 201, message: 'Equipo creado!' });
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

const deleteTeam = (req: Request, res: Response, next: NextFunction) => {
  Controller.deleteTeam(Number(req.params.id))
    .then(() => {
      success({ req, res, message: 'Equipo eliminado!' });
    })
    .catch(next);
};

//Routes
router
  .post('/', secure(), upsert)
  .put('/', secure(), upsert)
  .get('/:id', secure(), get)
  .get('/', secure(), getList)
  .delete('/:id', secure(), deleteTeam);

export = router;
