import type { NextFunction, Request, Response } from 'express';

export const ownerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = null;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  return next();
};
