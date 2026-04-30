import { Request, Response, NextFunction } from 'express';

/**
 * Extracts organizationId from the JWT payload (set by auth.middleware)
 * and attaches it to req for use in controllers.
 */
export const requireTenant = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user?.organizationId) {
    return res.status(403).json({ message: 'Organización requerida' });
  }
  (req as any).organizationId = user.organizationId;
  next();
};
