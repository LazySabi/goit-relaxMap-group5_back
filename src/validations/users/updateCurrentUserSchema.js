import { celebrate, Joi, Segments } from 'celebrate';

export const updateCurrentUserSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(32),
  }),
});