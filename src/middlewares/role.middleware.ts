import { Request, Response, NextFunction } from 'express';

// Middleware to check required roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role; // Extract role from the authenticated user
    if (!roles.includes(userRole || '')) {
      res.status(403).json({ error: 'Forbidden: Access denied' });
      return; // Ensure the function exits after sending a response

    }
    next();
  };
};
