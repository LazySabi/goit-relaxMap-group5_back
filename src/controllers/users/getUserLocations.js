import createHttpError from 'http-errors';
import { UserModel } from '../../models/user.js';
import { LocationModel } from '../../models/location.js';

export const getUserLocations = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 9));

    const filter = { ownerId: userId };

    const [data, totalItems] = await Promise.all([
      LocationModel.find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      LocationModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limit) || 1;

    res.status(200).json({
      data,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};