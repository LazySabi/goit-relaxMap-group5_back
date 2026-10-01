import createHttpError from 'http-errors';
import { SessionModel } from '../../models/session.js';
import { UserModel } from '../../models/user.js';
import {
  createAccessToken,
  createRefreshToken,
  setRefreshCookie,
} from '../../services/auth.js';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../../constants/time.js';

export const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) throw createHttpError(401, 'Refresh token is missing');

  const session = await SessionModel.findOne({ refreshToken });
  if (!session) throw createHttpError(401, 'Session not found');

  if (session.refreshTokenValidUntil < new Date()) {
    await SessionModel.findByIdAndDelete(session._id);
    throw createHttpError(401, 'Refresh token expired');
  }

  const user = await UserModel.findById(session.userId);
  if (!user) throw createHttpError(401, 'User not found');

  session.accessToken = createAccessToken(user);
  session.refreshToken = createRefreshToken();
  session.accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  session.refreshTokenValidUntil = new Date(Date.now() + ONE_MONTH);
  await session.save();

  setRefreshCookie(res, session);

  res.status(200).json({ accessToken: session.accessToken });
};