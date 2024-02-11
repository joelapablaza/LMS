import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';

const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  // wrong monogb id error
  if (err.name === 'CastError') {
    const message = `Recurso no encontrado. Invalido: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `Key duplicada ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === 'JsonWebTokenError') {
    const message = `El token JSON web no es válido, inténtalo de nuevo.`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    const message = `El token JSON web expiró, inténtalo de nuevo.`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
