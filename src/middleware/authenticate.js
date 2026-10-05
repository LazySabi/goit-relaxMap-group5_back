import createHttpError from 'http-errors';
import { SessionModel } from '../models/session.js';
import { UserModel } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const header = req.get('Authorization');

  const accessToken = header?.startsWith('Bearer ')
    ? header.slice(7)
    : req.cookies?.accessToken;
  if (!accessToken) {
    throw createHttpError(401, 'Please provide Authorization header');
  }

  const session = await SessionModel.findOne({ accessToken });
  if (!session) throw createHttpError(401, 'Session not found');

  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await UserModel.findById(session.userId);
  if (!user) throw createHttpError(401, 'User not found');

  req.user = user;
  req.session = session;
  next();
};