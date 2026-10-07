import createHttpError from 'http-errors';
import { LocationModel } from '../../models/location.js';
import { uploadImage } from '../../services/cloudinary.js';

export const updateLocation = async (req, res, next) => {
  try {
    const { locationId } = req.params;

    const location = await LocationModel.findById(locationId);

    if (!location) {
      throw createHttpError(404, 'Location not found');
    }

    if (location.ownerId.toString() !== req.user._id.toString()) {
      throw createHttpError(403, 'You can only edit your own location');
    }

    const { name, type, region, description } = req.body;

    const updateData = {
      name,
      locationType: type,
      region,
      description,
    };

    if (req.file) {
      updateData.image = await uploadImage(req.file.buffer);
    }

    const updatedLocation = await LocationModel.findByIdAndUpdate(
      locationId,
      updateData,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    res.status(200).json(updatedLocation);
  } catch (error) {
    next(error);
  }
};