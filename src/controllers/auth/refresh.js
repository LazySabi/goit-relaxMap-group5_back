import createHttpError from 'http-errors';
import { SessionsCollection } from './../../models/session.js';
import { UsersCollection } from '../../db/models/user.js';
import {createAccessToken,createRefreshToken,} from '../../services/auth.js';

export const refreshController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token is missing');
  }

  const session = await SessionsCollection.findOne({ refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await SessionsCollection.findByIdAndDelete(session._id);

    throw createHttpError(401, 'Refresh token expired');
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const newAccessToken = createAccessToken(user);
  const newRefreshToken = createRefreshToken();

  session.refreshToken = newRefreshToken;
  session.refreshTokenValidUntil = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  );

  await session.save();

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    accessToken: newAccessToken,
  });
};
