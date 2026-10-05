import { Router } from 'express';
import { usersControllers as ctrl } from '../controllers/index.js';
import { authenticate } from '../middleware/authenticate.js';                         
import { upload } from '../middleware/multer.js';                        
import { updateCurrentUserSchema } from '../validations/users/updateCurrentUserSchema.js';
import { userIdSchema } from '../validations/users/userIdSchema.js';

const usersRouter = new Router();

usersRouter.get('/current', authenticate, ctrl.getCurrentUser);

usersRouter.patch( 
  '/current',
  authenticate,
  upload.single('avatar'),
  updateCurrentUserSchema,
  ctrl.updateCurrentUser,
);

usersRouter.get('/:userId/locations', userIdSchema, ctrl.getUserLocations);
usersRouter.get('/:userId', userIdSchema, ctrl.getUserById);

export default usersRouter;