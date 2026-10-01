import { register } from './auth/register.js';
import { login } from './auth/login.js';
import { logout } from './auth/logout.js';
import { refresh } from './auth/refresh.js';

import { getLocationById } from './locations/getLocationById.js';
import { getLocations } from './locations/getLocations.js';
import { getPopularLocations } from './locations/getPopularLocations.js';
import { createLocation } from './locations/createLocation.js';
import { updateLocation } from './locations/updateLocation.js';

import { createFeedback } from './feedbacks/createFeedback.js';
import { getFeedbacks } from './feedbacks/getFeedbacks.js';

import { getRegions } from './categories/getRegions.js';
import { getLocationTypes } from './categories/getLocationTypes.js';

import { getCurrentUser } from './users/getCurrentUser.js';
import { updateCurrentUser } from './users/updateCurrentUser.js';

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

export const usersControllers = {
  getCurrentUser,
  updateCurrentUser,
};

export const feedbacksControllers = {
  createFeedback,
  getFeedbacks,
};

export const locationsControllers = {
  getLocationById,
  getLocations,
  getPopularLocations,
  createLocation,
  updateLocation,
};