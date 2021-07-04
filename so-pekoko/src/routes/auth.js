import express from 'express';
import controller from '../controllers/auth.js';

const router = express.Router();

router.get('/users', controller.getUsers.bind(controller));

router.post('/signup', controller.signup.bind(controller));

router.post('/login', controller.login.bind(controller));

router.delete('/delete', controller.deleteUser.bind(controller));

export default router;
