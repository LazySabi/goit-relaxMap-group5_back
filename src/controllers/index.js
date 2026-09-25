import { register } from './auth/register.js';
import { getLocationById } from './locations/getLocationById.js';
import { createFeedback } from './feedbacks/createFeedback.js';

export const authControllers = {
  register,
};

export const categoriesControllers = {};

export const usersControllers = {};

export const feedbacksControllers = {
  createFeedback,
};

export const locationsControllers = {
  getLocationById,
};