import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate DTOs using class-validator.
 * Ensures that the request body matches the DTO class.
 *
 * @param DTOClass The DTO class to validate against
 * @returns Express middleware function
 */
export const validateDTO = (DTOClass: any) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Transform the plain object to an instance of the DTO class
    const dtoInstance = plainToInstance(DTOClass, req.body);

    // Validate the instance
    const errors = await validate(dtoInstance);

    // If validation errors exist, send a 400 response
    if (errors.length > 0) {
      return next(res.status(400).json({
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      }));
    }

    // If no errors, call next middleware
    next();
  } catch (err) {
    // Pass any unexpected errors to the global error handler
    next(err);
  }
};
