import { LocationModel } from '../../models/location.js';

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const SORTS = {
  popular: { rate: -1 },
  rating: { rate: -1 },
  newest: { createdAt: -1 },
};

export const getLocations = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 9));
    const { search, region, type, sort } = req.query;

    const filter = {};
    if (search) filter.name = { $regex: escapeRegex(search), $options: 'i' };
    if (region) filter.region = region;
    if (type) filter.locationType = { $in: type.split(',') };

    const [data, totalItems] = await Promise.all([
      LocationModel.find(filter)
        .sort(SORTS[sort] ?? SORTS.newest)
        .skip((page - 1) * limit)
        .limit(limit),
      LocationModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limit) || 1;
    res.status(200).json({
      data,
      pagination: { page, limit, totalItems, totalPages, hasNextPage: page < totalPages },
    });
  } catch (error) {
    next(error);
  }
};