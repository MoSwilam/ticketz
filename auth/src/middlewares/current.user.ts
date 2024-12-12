import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  interface Request {
    currentUser?: any;
  }
}
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
}