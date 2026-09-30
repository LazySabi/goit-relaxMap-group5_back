import crypto from 'node:crypto';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/time.js';
import { SessionModel } from '../models/session.js';

export const createAccessToken = () => crypto.randomBytes(32).toString('hex');
export const createRefreshToken = () => crypto.randomBytes(32).toString('hex');

export const createSession = (userId) =>
  SessionModel.create({
    userId,
    accessToken: createAccessToken(),
    refreshToken: createRefreshToken(),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  });

export const refreshCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};

export const setRefreshCookie = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    ...refreshCookieOptions,
    expires: session.refreshTokenValidUntil,
  });
};