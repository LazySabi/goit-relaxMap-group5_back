import { LocationModel } from '../../models/location.js';

export const getPopularLocations = async (req, res, next) => {
  try {
    const locations = await LocationModel.find()
      .sort({ rate: -1 })
      .limit(6);

    res.status(200).json({
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};