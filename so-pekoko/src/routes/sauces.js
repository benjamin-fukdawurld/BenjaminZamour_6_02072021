import express from 'express';
import controller from '../controllers/sauces.js';

import auth from '../middlewares/auth.js'
import multer from '../middlewares/multer-config.js'

const router = express.Router();

const authMw = auth();

router.get('/', authMw, controller.getSauces.bind(controller));

router.get('/:id', authMw, controller.getSauce.bind(controller));

router.post('/', authMw, multer, controller.addSauce.bind(controller));

router.put('/:id', authMw, multer, controller.updateSauce.bind(controller));

router.delete('/:id', authMw, controller.deleteSauce.bind(controller));

router.post('/:id/like', authMw, controller.likeSauce.bind(controller));

export default router;
