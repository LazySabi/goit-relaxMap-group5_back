import { Joi, celebrate, Segments } from 'celebrate';

export const createLocationSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(3).max(96).required(),

    type: Joi.string().trim().max(64).required(),

    region: Joi.string().trim().max(64).required(),

    description: Joi.string().trim().min(20).max(6000).required(),
  }),
});