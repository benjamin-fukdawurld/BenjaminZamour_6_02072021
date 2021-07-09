import express from 'express';
import controller from '../controllers/auth.js';
import auth from '../middlewares/auth.js'
import passwordCheck from '../middlewares/password-check.js';

const router = express.Router();

router.get('/users', auth(1), controller.getUsers.bind(controller));

router.post('/signup', passwordCheck, controller.signup.bind(controller));

router.post('/login', controller.login.bind(controller));

router.delete('/delete', auth(), controller.deleteUser.bind(controller));

export default router;
