import { register } from './auth/register.js';
import { getLocationById } from './locations/getLocationById.js';
import { getLocations } from './locations/getLocations.js';
import { createFeedback } from './feedbacks/createFeedback.js';
import { getRegions } from './categories/getRegions.js';
import { getLocationTypes } from './categories/getLocationTypes.js';
import { getFeedbacks } from './feedbacks/getFeedbacks.js';
import { getPopularLocations } from './locations/getPopularLocations.js';

export const authControllers = {
  register,
};

export const categoriesControllers = {
  getRegions,
  getLocationTypes,
};

export const usersControllers = {};

export const feedbacksControllers = {
  createFeedback,
  getFeedbacks,
};

export const locationsControllers = {
  getLocationById,
  getLocations,
  getPopularLocations,
};
