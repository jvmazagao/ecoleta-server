import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer'
import { celebrate, Joi} from 'celebrate'
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsControllers';

const pointsController = new PointsController();
const itemsController =  new ItemsController();
const upload = multer(multerConfig);

const routes = express.Router();

routes.get('/items', itemsController.index );

routes.post('/points', 
upload.single('image') , 
celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
    })
})
, pointsController.create);

routes.get('/points/:id', pointsController.show);

routes.get('/points', pointsController.index);

export default routes;