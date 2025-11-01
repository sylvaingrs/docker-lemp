import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  userId: number;
  email: string;
}

export function generateToken(payload: object) {
  const secret: jwt.Secret = process.env.JWT_SECRET || '';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const expiresIn: number = Number(process.env.JWT_EXPIRES_IN) || 900;

  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
}

export function verifyToken(token: string): TokenPayload | null {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'string') {
      return null;
    }
    if (!decoded.userId || !decoded.email) {
      return null;
    }

    return decoded as TokenPayload;
  } catch (error) {
    return null;
  }
}
