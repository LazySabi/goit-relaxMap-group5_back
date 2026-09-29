import { Router } from 'express';
import { feedbacksControllers as ctrl } from '../controllers/index.js';
import { createFeedbackSchema } from '../validations/feedbacks/createFeedbackSchema.js';
import { getFeedbackSchema } from '../validations/feedbacks/getFeedbackSchema.js';
const feedbacksRouter = Router();

feedbacksRouter.post(
  '/', //authenticate,
  createFeedbackSchema,
  ctrl.createFeedback,
);
feedbacksRouter.get('/', getFeedbackSchema, ctrl.getFeedbacks);

export default feedbacksRouter;
