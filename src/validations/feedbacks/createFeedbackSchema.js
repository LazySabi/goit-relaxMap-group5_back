import { celebrate, Joi, Segments } from 'celebrate';

export const createFeedbackSchema = celebrate({
  [Segments.BODY]: Joi.object({
    locationId: Joi.string().hex().length(24).required(),
    userName: Joi.string().min(2).max(32).required(),
    rate: Joi.number().min(1).max(5).required(),
    description: Joi.string().min(1).max(200).required(),
  }),
});