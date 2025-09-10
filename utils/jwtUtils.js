import jwt from 'jsonwebtoken';
import '../dotenv.js'

export function generateSessionToken(payload) {
  return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '14d' })
}

export function generateActionToken(payload) {
  return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '1h' })
}
