import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import CatchAsyncError from "../midleware/catchAsyncErrors";
import userModel from "../models/user.model";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import courseModel from "../models/course.model";
import OrderModel from "../models/order.model";

// get users analytics --- admin only
// export const getUsersAnalytics = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await generateLast12MonthsData(userModel);

//       res.status(200).json({
//         success: true,
//         users,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

// get analytics --- admin only
export const getAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model = req.params.model;
      let data;

      // switch case
      switch (model) {
        case "users":
          data = await generateLast12MonthsData(userModel);
          break;
        case "courses":
          data = await generateLast12MonthsData(courseModel);
          break;
        case "orders":
          data = await generateLast12MonthsData(OrderModel);
          break;
        default:
          return next(new ErrorHandler("Invalid Model", 400));
      }

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);