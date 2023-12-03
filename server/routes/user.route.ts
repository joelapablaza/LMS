import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../midleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/active-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.get("/me", isAuthenticated, updateAccessToken, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put(
  "/update-user-info",
  isAuthenticated,
  updateAccessToken,
  updateUserInfo
);

userRouter.put(
  "/update-user-password",
  isAuthenticated,
  updateAccessToken,
  updatePassword
);

userRouter.put(
  "/update-user-avatar",
  isAuthenticated,
  updateAccessToken,
  updateProfilePicture
);

userRouter.get(
  "/get-users",
  isAuthenticated,
  updateAccessToken,
  authorizeRoles("admin"),
  getAllUsers
);

userRouter.put(
  "/update-user-role",
  isAuthenticated,
  updateAccessToken,
  authorizeRoles("admin"),
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  updateAccessToken,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
