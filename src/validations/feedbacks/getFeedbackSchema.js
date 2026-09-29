import { celebrate, Joi, Segments } from 'celebrate';

export const getFeedbackSchema = celebrate({
  [Segments.QUERY]: Joi.object({
    locationId: Joi.string().hex().length(24).optional(),
    page: Joi.number().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
  }),
});
