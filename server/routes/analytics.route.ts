import express from "express";
import { authorizeRoles, isAuthenticated } from "../midleware/auth";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUsersAnalytics
);

analyticsRouter.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getCoursesAnalytics
);

analyticsRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);

// analyticsRouter.get(
//   "/get-analytics/:model",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   getAnalytics
// );

export default analyticsRouter;
