import jwt, { JwtPayload } from 'jsonwebtoken';

interface AccessTokenPayload extends JwtPayload {
  userId: number;
  email: string;
  type: 'access';
}

interface RefreshTokenPayload extends JwtPayload {
  userId: number;
  type: 'refresh';
}

export type AnyTokenPayload = AccessTokenPayload | RefreshTokenPayload;

export function generateToken(payload: AnyTokenPayload, expiresIn?: number): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
}

export function verifyToken(token: string): AnyTokenPayload | null {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'string' || !('userId' in decoded) || !('type' in decoded)) {
      return null;
    }

    if (decoded.type === 'access') {
      if (!('email' in decoded) || typeof decoded.email !== 'string') {
        return null;
      }
      return decoded as AccessTokenPayload;
    }

    if (decoded.type === 'refresh') {
      return decoded as RefreshTokenPayload;
    }

    return null;
  } catch (error) {
    return null;
  }
}
