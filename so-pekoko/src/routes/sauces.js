import express from 'express';
import controller from '../controllers/sauces.js';

const router = express.Router();

router.get('/api/sauces', controller.getSauces);

router.get('/api/sauces/:id', controller.getSauce);

router.post('/api/sauces', controller.addSauce);

router.put('/api/sauces/:id', controller.updateSauce);

router.delete('/api/sauces/:id', controller.deleteSauce);

router.post('/api/sauces/:id/like', controller.likeSauce);

export default router;
