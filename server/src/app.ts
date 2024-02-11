import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// middlewares
import ErrorMiddleware from './middlewares/error';

// routes
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';
import notificationRoute from './routes/notification.route';
import analyticsRouter from './routes/analytics.route';
import layoutRouter from './routes/layout.route';

// utils
import ErrorHandler from './utils/ErrorHandler';

dotenv.config();

export const app = express();

// body parser
app.use(express.json({ limit: '50mb' }));

// cookie parser
app.use(cookieParser());

app.use(morgan('combined'));

// cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use(helmet());

app.options('*', cors());

// health checker
app.get('/health', (req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: 'Todo OK'
  });
});

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, message: 'Funciona' });
  } catch (error) {
    next(error);
  }
});

// routes
app.use(
  '/api/v1',
  userRouter,
  courseRouter,
  orderRouter,
  notificationRoute,
  analyticsRouter,
  layoutRouter
);

// unknown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new ErrorHandler(`Route ${req.originalUrl} not found`, 404);
  next(err);
});

app.use(ErrorMiddleware);
