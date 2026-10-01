import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authControllers as ctrl } from '../controllers/index.js';
import { authenticate } from '../middleware/authenticate.js';
import { registerUserSchema, loginUserSchema } from '../validations/auth/index.js';

const authRouter = new Router();

authRouter.post('/register', celebrate(registerUserSchema), ctrl.register);
authRouter.post('/login', celebrate(loginUserSchema), ctrl.login);
authRouter.post('/logout', authenticate, ctrl.logout);
authRouter.post('/refresh', ctrl.refresh);

export default authRouter;