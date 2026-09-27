import { register } from './auth/register.js';
import { login } from './auth/login.js';
import { logout } from './auth/logout.js';
import { refresh } from './auth/refresh.js';
import { getLocationById } from './locations/getLocationById.js';
import { getLocations } from './locations/getLocations.js';
import { createFeedback } from './feedbacks/createFeedback.js';
import { getRegions } from './categories/getRegions.js';
import { getLocationTypes } from './categories/getLocationTypes.js';

export const authControllers = {
  register,
  login,
  logout,
  refresh,
};

export const categoriesControllers = {
  getRegions,
  getLocationTypes,
};

export const usersControllers = {};

export const feedbacksControllers = {
  createFeedback,
};

export const locationsControllers = {
  getLocationById,
  getLocations,
};