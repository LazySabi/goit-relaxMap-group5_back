import { Schema, model } from 'mongoose';

const RegionSchema = new Schema(
  {
    region: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    level: { type: String },
    note: { type: String },
  },
  { versionKey: false },
);

export const RegionModel = model('region', RegionSchema, 'regions');