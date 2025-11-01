import express, {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';

import { verifyToken } from '../utils/jwt';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      userId: number;
      email: string;
    };
  }
}

export function authenticateToken(
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token missing' });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ error: 'Token invalid or expired' });
    return;
  }

  req.user = decoded;

  next();
}
