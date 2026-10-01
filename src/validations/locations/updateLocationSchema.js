import { Joi, celebrate, Segments } from 'celebrate';

export const updateLocationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(3).max(96),

    type: Joi.string().trim().max(64),

    region: Joi.string().trim().max(64),

    description: Joi.string().trim().min(20).max(6000),
  }),
});