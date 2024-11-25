import * as express from 'express';

declare global {
  namespace Express {
    interface User {
      userId: number;
      role: string;
    }

    interface Request {
      user?: User; // Add the `user` property to the Request interface
    }
  }
}
