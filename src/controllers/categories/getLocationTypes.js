import { CategoryModel } from '../../models/category.js';

export const getLocationTypes = async (req, res, next) => {
  try {
    const types = await CategoryModel.find();
    res.status(200).json({ data: types });
  } catch (error) {
    next(error);
  }
};