import express from 'express';
import controller from '../controllers/sauces.js';

import auth from '../middlewares/auth.js'
import multer from '../middlewares/multer-config.js'

const router = express.Router();

router.get('/', auth, controller.getSauces.bind(controller));

router.get('/:id', auth, controller.getSauce.bind(controller));

router.post('/', auth, multer, controller.addSauce.bind(controller));

router.put('/:id', auth, multer, controller.updateSauce.bind(controller));

router.delete('/:id', auth, controller.deleteSauce.bind(controller));

router.post('/:id/like', auth, controller.likeSauce.bind(controller));

export default router;
