import { Router } from 'express';
import { authControllers as ctrl } from '../controllers/index.js';

const authRouter = new Router();

authRouter.get('/register', ctrl.register);
authRouter.post('/logout', authenticate, ctrl.logout);
authRouter.post('/refresh', authenticate, ctrl.refresh);

export default authRouter;