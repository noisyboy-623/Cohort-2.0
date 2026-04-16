import {Router} from 'express'
import { validateRegisterUser } from '../validators/auth.validator.js';
import { registerController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', validateRegisterUser, registerController )

export default router