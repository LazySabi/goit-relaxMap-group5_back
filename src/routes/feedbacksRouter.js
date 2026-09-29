import { Router } from 'express';
import { feedbacksControllers as ctrl } from '../controllers/index.js';

<<<<<<< Updated upstream
const feedbacksRouter = new Router();

export default feedbacksRouter;
=======
feedbacksRouter.post('/', authenticate, createFeedbackSchema, ctrl.createFeedback);

const feedbacksRouter = Router();

feedbacksRouter.post(
  '/', //authenticate,
  createFeedbackSchema,
  ctrl.createFeedback,
);
feedbacksRouter.get('/', getFeedbackSchema, ctrl.getFeedbacks);

export default feedbacksRouter;
>>>>>>> Stashed changes
