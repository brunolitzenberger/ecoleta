import express, { request, response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
const routes = express.Router();
const upload = multer(multerConfig);
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
//index, show, create, update, delete
routes.post('/points', 
    upload.single('image'), 
    pointsController.create);
    routes.get('/points', 
    celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
        items: Joi.string().required(),
    })
}, {
    abortEarly: false
}),
    pointsController.create
);
routes.get('/points/:id', pointsController.show);
export default routes;