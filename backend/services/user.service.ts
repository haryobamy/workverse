import { Response } from 'express';
import userModel from '../models/user.model';

//get all users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(
    id,
    { role: role },
    { new: true }
  );

  res.status(201).json({
    success: true,
    user,
  });
};
