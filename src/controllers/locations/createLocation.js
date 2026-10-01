import createHttpError from 'http-errors';
import { LocationModel } from '../../models/location.js';
import { uploadImage } from '../../services/cloudinary.js';

export const createLocation = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'Location image is required');
    }

    const { name, type, region, description } = req.body;

    const imageUrl = await uploadImage(req.file.buffer);

    const location = await LocationModel.create({
      image: imageUrl,
      name,
      locationType: type,
      region,
      description,
      ownerId: req.user._id,
    });

    res.status(201).json(location);
  } catch (error) {
    next(error);
  }
};