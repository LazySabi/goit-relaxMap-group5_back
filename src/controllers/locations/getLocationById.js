import createHttpError from 'http-errors';
import { LocationModel } from '../../models/location.js';

export const getLocationById = async (req, res, next) => {
  try {
    const { locationId } = req.params;

    const location = await LocationModel.findById(locationId);

    if (!location) {
      throw createHttpError(404, 'Location not found');
    }
const locationData = location.toObject();
await location.populate('ownerId', '_id name');
const owner = location.ownerId;

    res.status(200).json({
      ...locationData,
      author: owner
        ? {
            id: owner._id.toString(),
            name: owner.name,
          }
        : null,
    });
  } catch (error) {
    next(error);
  }
};