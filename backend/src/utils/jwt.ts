import jwt from 'jsonwebtoken';

export function generateToken(payload = {}) {
  const secret: jwt.Secret = process.env.JWT_SECRET || '';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const expiresIn: number = Number(process.env.JWT_EXPIRES_IN) || 900;

  const options: jwt.SignOptions = {
    expiresIn: expiresIn,
  };

  const token = jwt.sign({ data: payload }, secret, options);

  return token;
}
