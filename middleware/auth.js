import jwt from 'jsonwebtoken';
import '../dotenv.js'
import { generateSessionToken } from '../utils/jwtTokenGeneration.js'


export function refreshSessionTokenIfNeeded(req, res, next) {
  const sessionToken = req.cookies.session_token;
  if (!sessionToken) return next();
  jwt.verify(sessionToken, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return next();
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = user.exp - now;
    // If less than 1 day left — update the token
    if (timeLeft < 24 * 60 * 60) {
      const newSessionToken = generateSessionToken(user)
      res.cookie('session_token', newSessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
  });
}

export function authenticateActionToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Missing action token' })
  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' })
    req.user = user
    next()
  })
}