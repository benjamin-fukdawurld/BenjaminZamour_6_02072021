import express from 'express';
import controller from '../controllers/auth.js';

const router = express.Router();

router.get('/api/auth/users', controller.getUsers.bind(controller));

router.post('/api/auth/signup', controller.signup.bind(controller));

router.post('/api/auth/login', controller.login.bind(controller));

router.delete('/api/auth/delete', controller.deleteUser.bind(controller));

export default router;
