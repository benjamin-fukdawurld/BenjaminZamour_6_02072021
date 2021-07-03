import express from 'express';
import controller from '../controllers/auth.js';

const router = express.Router();

router.post('/api/auth/signup', controller.signup.bind(controller));

router.post('/api/auth/login', controller.login.bind(controller));

export default router;
