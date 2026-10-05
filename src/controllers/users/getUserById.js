import createHttpError from 'http-errors';
import { UserModel } from '../../models/user.js';
import { LocationModel } from '../../models/location.js';

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId).select('_id name avatarUrl createdAt');

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const articlesAmount = await LocationModel.countDocuments({
      ownerId: user._id,
    });

    res.status(200).json({
  id: user._id,
  name: user.name,
  avatarUrl: user.avatarUrl,
  createdAt: user.createdAt,
  articlesAmount,
});
  } catch (error) {
    next(error);
  }
};