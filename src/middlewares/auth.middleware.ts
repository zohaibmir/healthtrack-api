import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.utils';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return; // Ensure the function exits after sending a response
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
    // Verify the token
    const decoded = verifyToken(token) as Express.User; // Explicitly cast the decoded token
    req.user = decoded; // Attach user info to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return; // Ensure the function exits after sending a response
  }
};
