import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UserModel } from '../../models/user.js';
import { createSession, setRefreshCookie } from '../../services/auth.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (await UserModel.exists({ email })) {
    throw createHttpError(409, 'Email in use');
  }

  const user = await UserModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const session = await createSession(user._id);
  setRefreshCookie(res, session);

  res.status(201).json({ user, accessToken: session.accessToken });
};