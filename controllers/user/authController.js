import { User } from '../../models/User.js';
import logger from '../../utils/logger.js';
import { setAuthTokens } from '../../utils/auth.js';
import bcrypt from 'bcrypt';

export async function signUp(req, res, next) {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      logger.warn(`Sign up failed: username or password is missing`);
      const error = new Error('Username and password are required');
      error.status = 400;
      next(error);
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      logger.warn(`Sign up failed: username ${username} already exists`);
      const error = new Error('Username already exists');
      error.status = 400;
      next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ ...req.body, password: hashedPassword })
    const token = setAuthTokens(res, user);
    logger.info(`User ${user.username} (id: ${user.id}) signed up`);

    const { password: _, ...safeUser } = user.toJSON();
    res.json({ success: true, data: { user: safeUser, token } });
  } catch (error) {
    logger.error(`Sign up error: ${error.message}`);
    next(error);
  }
}

export async function signIn(req, res, next) {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      logger.warn(`Sign in failed: username or password is missing`);
      const error = new Error('Username and password are required');
      error.status = 400;
      next(error);
    }
    
    const user = await User.findOne({ where: { username } });
    if (!user) {
      logger.warn(`Sign in failed: username ${username} not found`);
      const error = new Error('Username not found');
      error.status = 400;
      next(error);
    }
    
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      logger.warn(`Sign in failed: incorrect password`);
      const error = new Error('Incorrect password');
      error.status = 400;
      next(error);
    }

    const token = setAuthTokens(res, user);
    logger.info(`User ${user.username} (id: ${user.id}) signed in`);

    const { password: _, ...safeUser } = user.toJSON();
    res.json({ success: true, data: { user: safeUser, token } });
  } catch (error) {
    logger.error(`Sign in error: ${error.message}`);
    next(error);
  }
}

export async function signOut(req, res, next) {
  try {
    res.clearCookie('sessionToken');
    res.json({ success: true });
  } catch (error) {
    logger.error(`Sign out error: ${error.message}`);
    next(error);
  }
}