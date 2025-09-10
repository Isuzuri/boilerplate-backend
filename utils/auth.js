import jwt from 'jsonwebtoken';
import '../dotenv.js'
import { generateActionToken, generateSessionToken } from './jwtUtils.js'

export function refreshActionToken(req, res) {
  const sessionToken = req.cookies.sessionToken
  if (!sessionToken) return res.status(401).json({ error: 'Missing session token' })
  jwt.verify(sessionToken, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired session token' })
    const newActionToken = generateActionToken({ id: user.id, username: user.username })
    res.json({ actionToken: newActionToken })
  })
}

export function setAuthTokens(res, user) {
  const sessionToken = generateSessionToken(user)
  const actionToken = generateActionToken(user)
  res.cookie('sessionToken', sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  });
  res.json({ actionToken })
}