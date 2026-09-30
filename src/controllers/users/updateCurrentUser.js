import { UserModel } from '../../models/user.js';
import { LocationModel } from '../../models/location.js';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';

export const updateCurrentUser = async (req, res, next) => {
  try {
    const updateData = {};

    if (req.body.name) {
      updateData.name = req.body.name;
    }

    if (req.file) {
      const result = await saveFileToCloudinary(req.file.buffer, req.user._id);
      updateData.avatarUrl = result.secure_url;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      updateData,
      { returnDocument: 'after' },
    );

    const articlesAmount = await LocationModel.countDocuments({
      ownerId: req.user._id,
    });

    res.status(200).json({
      ...updatedUser.toJSON(),
      articlesAmount,
    });
  } catch (error) {
    next(error);
  }
};