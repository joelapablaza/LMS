import { Response } from 'express';
import userModel, { IUser } from '../models/user.model';

// get user by id
export const getUserById = async (id: string, res: Response) => {
  const user = await userModel.findById(id).populate('courses');

  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  }
};

// get all users
export const getAllUsersService = async (res: Response) => {
  const users: IUser[] | null = await userModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleService = async (
  res: Response,
  email: string,
  role: string
) => {
  const user: IUser | null = await userModel.findOneAndUpdate(
    { email },
    { role },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  res.status(201).json({
    success: true,
    user,
  });
};
