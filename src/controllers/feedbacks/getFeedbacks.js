import { FeedbackModel } from '../../models/feedback.js';
import { LocationModel } from '../../models/location.js';

export const getFeedbacks = async (req, res) => {
  const { locationId, page = 1, limit = 10 } = req.query;

  const currentPage = Number(page);
  const currentLimit = Number(limit);

  let filter = {};

  if (locationId) {
    const location = await LocationModel.findById(locationId);

    if (!location) {
      return res.status(404).json({
        status: 404,
        message: 'Location not found',
      });
    }

    filter = {
      _id: { $in: location.feedbacksId },
    };
  }

  const skip = (currentPage - 1) * currentLimit;
  const [feedbacks, total] = await Promise.all([
    FeedbackModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(currentLimit),
    FeedbackModel.countDocuments(filter),
  ]);

  const totalPages = total === 0 ? 1 : Math.ceil(total / currentLimit);
  res.status(200).json({
    feedbacks,
    total,
    page: currentPage,
    limit: currentLimit,
    totalPages,
  });
};
