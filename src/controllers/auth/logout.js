import { SessionsCollection } from './../../models/session.js';

export const logoutController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    await SessionsCollection.findOneAndDelete({ refreshToken });
  }

  res.clearCookie('refreshToken');
  res.sendStatus(204);
};
