import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema({
    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'location',
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
},
);

export const FeedbackModel = model('feedback', FeedbackSchema);