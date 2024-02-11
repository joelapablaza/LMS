import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CatchAsyncError from './catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import { redis } from '../utils/redis';

// authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, rep: Response, next: NextFunction) => {
    const access_token = String(req.cookies.access_token) as string;

    if (!access_token) {
      return next(
        new ErrorHandler('Please login to access this resource', 400)
      );
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      new ErrorHandler('El token de acceso no es válido', 400);
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(
        new ErrorHandler(
          'Por favor, inicia sesión para acceder a este recurso',
          400
        )
      );
    }
    req.user = JSON.parse(user);

    next();
  }
);

// validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || '')) {
      return next(
        new ErrorHandler(
          `Rol: ${req.user?.role} no tiene permitido acceder a este recurso`,
          403
        )
      );
    }
    next();
  };
};
