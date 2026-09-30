import { LocationModel } from '../../models/location.js';

export const getCurrentUser = async (req, res, next) => {
  try {
    const articlesAmount = await LocationModel.countDocuments({
      ownerId: req.user._id,
    });

    res.status(200).json({
      ...req.user.toJSON(),
      articlesAmount,
    });
  } catch (error) {
    next(error);
  }
};