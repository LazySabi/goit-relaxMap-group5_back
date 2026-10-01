import { Joi, celebrate, Segments } from 'celebrate';

export const locationIdSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string()
      .hex()
      .length(24)
      .required(),
  }),
});