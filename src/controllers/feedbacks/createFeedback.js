import { FeedbackModel } from '../../models/feedback.js';
import { LocationModel } from '../../models/location.js';

export const createFeedback = async (req, res) => {
  const { locationId, rate, description } = req.body;

  const location = await LocationModel.findById(locationId);

  if (!location) {
    return res.status(404).json({
      status: 404,
      message: 'Location not found',
    });
  }
  const feedback = await FeedbackModel.create({
    rate,
    description,
    owner: req.user._id,
    userName: req.user.name,
  });

  await LocationModel.findByIdAndUpdate(locationId, {
    $addToSet: { feedbacksId: feedback._id },
  });

  res.status(201).json({
    status: 201,
    message: 'Feedback created successfully',
    data: feedback,
  });
};