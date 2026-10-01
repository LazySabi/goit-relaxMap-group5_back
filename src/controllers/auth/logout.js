import { SessionModel } from '../../models/session.js';
import { refreshCookieOptions } from '../../services/auth.js';

export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    await SessionModel.findOneAndDelete({ refreshToken });
  }

  res.clearCookie('refreshToken', refreshCookieOptions);
  res.sendStatus(204);
};
