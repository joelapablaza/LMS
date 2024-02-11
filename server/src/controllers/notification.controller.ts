import { Request, Response, NextFunction } from 'express';
import cron from 'node-cron';

// utils
import CatchAsyncError from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';

// models
import NotificationModel from '../models/notification.model';

// get all notifications --- only for admin
export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// update notification status --- only admin
export const updateNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);

      if (!notification) {
        return next(new ErrorHandler('Notficacion no encontrada', 404));
      }

      notification.status = 'read';

      await notification.save();

      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// delete notification --- admin only
cron.schedule('0 0 0 * * *', async () => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await NotificationModel.deleteMany({
      status: 'read',
      createdAt: { $lt: thirtyDaysAgo },
    });

    await NotificationModel.create({
      user: 'admin',
      title: 'Notificaciones eliminadas',
      message: `Notificaciones antiguas borradas con éxito`,
    });
  } catch (error: any) {
    console.log(error.message);
  }
});
