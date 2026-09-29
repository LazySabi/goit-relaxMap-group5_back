import { FeedbackModel } from '../../models/feedback.js';

export const createFeedback = async (req, res) => {
const feedback = await FeedbackModel.create({...req.body, 
owner: req.user._id,
userName: req.user.name,
});

  res.status(201).json({
    status: 201,
    message: 'Feedback created successfully',
    data: feedback,
  });
};
