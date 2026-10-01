import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UserModel } from '../../models/user.js';
import { SessionModel } from '../../models/session.js';
import { createSession, setRefreshCookie } from '../../services/auth.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  const isValid = user && (await bcrypt.compare(password, user.password));

  if (!isValid) throw createHttpError(401, 'Invalid email or password');

  await SessionModel.deleteMany({ userId: user._id });

  const session = await createSession(user._id);
  setRefreshCookie(res, session);

  res.json({ user, accessToken: session.accessToken });
};