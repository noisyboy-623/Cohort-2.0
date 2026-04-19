import {Router} from 'express'
import { validateLoginUser, validateRegisterUser } from '../validators/auth.validator.js';
import { getMeController, googleCallback, loginController, registerController } from '../controllers/auth.controller.js';
import passport from 'passport';
import { config } from '../config/config.js'
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', validateRegisterUser, registerController )
router.post('/login', validateLoginUser, loginController )
router.get('/google', passport.authenticate('google', {
    scope:['profile', 'email']
}))
router.get('/google/callback', passport.authenticate('google', {
    session:false, 
    failureRedirect: config.NODE_ENV == 'development' ? 'http://localhost:5173/login':'/login' 
}), googleCallback)
router.get('/me', authenticateUser, getMeController)

export default router