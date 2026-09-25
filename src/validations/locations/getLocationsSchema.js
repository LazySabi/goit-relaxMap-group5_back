import { Joi, celebrate, Segments } from 'celebrate';

export const getLocationsSchema = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(9),
    search: Joi.string().trim().allow(''),
    region: Joi.string(),
    type: Joi.string(),
    sort: Joi.string().valid('popular', 'rating', 'newest'),
  }),
});