import { Joi, celebrate, Segments } from 'celebrate';

export const userIdSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
});