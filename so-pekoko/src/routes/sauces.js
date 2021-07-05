import express from 'express';
import controller from '../controllers/sauces.js';

import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth, controller.getSauces);

router.get('/:id', auth, controller.getSauce);

router.post('/', auth, controller.addSauce);

router.put('/:id', auth, controller.updateSauce);

router.delete('/:id', auth, controller.deleteSauce);

router.post('/:id/like', auth, controller.likeSauce);

export default router;
