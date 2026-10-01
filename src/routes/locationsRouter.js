import { Router } from 'express';
import { locationsControllers as ctrl } from '../controllers/index.js';
import { authenticate } from '../middleware/authenticate.js';
import { locationUpload } from '../middleware/locationMulter.js';
import {
  createLocationSchema,
  locationIdSchema,
  updateLocationSchema,
} from '../validations/index.js';

const locationsRouter = new Router();

locationsRouter.get('/', ctrl.getLocations);

locationsRouter.get('/popular', ctrl.getPopularLocations);

locationsRouter.post(
  '/',
  authenticate,
  locationUpload.single('image'),
  createLocationSchema,
  ctrl.createLocation,
);

locationsRouter.get('/:locationId', ctrl.getLocationById);

locationsRouter.patch(
  '/:locationId',
  authenticate,
  locationIdSchema,
  locationUpload.single('image'),
  updateLocationSchema,
  ctrl.updateLocation,
);

export default locationsRouter;