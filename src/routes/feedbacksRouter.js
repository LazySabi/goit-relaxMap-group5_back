import { Router } from 'express';
import { feedbacksControllers as ctrl } from '../controllers/index.js';
import { createFeedbackSchema } from '../validations/feedbacks/createFeedbackSchema.js';

const feedbacksRouter = Router();

feedbacksRouter.post('/', //authenticate,
     createFeedbackSchema, ctrl.createFeedback);

export default feedbacksRouter;