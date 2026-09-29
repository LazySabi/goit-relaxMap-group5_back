import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema(
  {  userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 32,
    },
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const FeedbackModel = model('feedback', FeedbackSchema);
