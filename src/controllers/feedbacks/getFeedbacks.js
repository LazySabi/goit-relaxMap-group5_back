import { FeedbackModel } from '../../models/feedback.js';

export const getFeedbacks = async (req, res) => {
  const { locationId, page = 1, limit = 10 } = req.query;

  const filter = locationId ? { locationId } : {};
  const skip = (page - 1) * limit;

  const [feedbacks, total] = await Promise.all([
    FeedbackModel.find({ locationId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    FeedbackModel.countDocuments({ locationId }),
  ]);

  res.status(200).json({
    feedbacks,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  });
};
