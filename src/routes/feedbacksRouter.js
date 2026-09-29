import { Router } from 'express';
import { feedbacksControllers as ctrl } from '../controllers/index.js';
import { getFeedbackSchema } from '../validations/feedbacks/getFeedbackSchema.js';
import { authenticate } from '../middleware/authenticate.js';

export default feedbacksRouter;
const feedbacksRouter = Router();

feedbacksRouter.post('/', authenticate, createFeedbackSchema, ctrl.createFeedback);

const feedbacksRouter = Router();

feedbacksRouter.post(
  '/', //authenticate,
  createFeedbackSchema,
  ctrl.createFeedback,
);
feedbacksRouter.get('/', getFeedbackSchema, ctrl.getFeedbacks);

export default feedbacksRouter;

