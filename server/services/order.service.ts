import { NextFunction, Response, Request } from "express";
import CatchAsyncError from "../midleware/catchAsyncErrors";
import OrderModel from "../models/order.model";

// create new order

export const newOrder = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);

    res.status(201).json({
      success: true,
      order,
    });
  }
);
