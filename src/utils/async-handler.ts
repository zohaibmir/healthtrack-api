import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * A utility function that wraps async route handlers to catch errors and pass them to next()
 * @param fn A function that handles the request and returns a Promise
 * @returns A wrapped function compatible with Express route handlers
 */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
