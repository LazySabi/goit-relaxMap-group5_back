import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
  {
    type: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String },
  },
  { versionKey: false },
);

export const CategoryModel = model('category', CategorySchema, 'location_types');