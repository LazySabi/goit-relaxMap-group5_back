import { Schema, model } from 'mongoose';

const LocationSchema = new Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    locationType: { type: String, required: true },
    region: { type: String, required: true },
    rate: { type: Number, default: 0 },
    description: { type: String, required: true },
    coordinates: {
      lat: { type: Number },
      lon: { type: Number },
    },
    ownerId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    feedbacksId: [{ type: Schema.Types.ObjectId, ref: 'feedback' }],
  },
  { timestamps: true, versionKey: false },
);

LocationSchema.index({ region: 1, locationType: 1, rate: -1 });

export const LocationModel = model('location', LocationSchema, 'locations');