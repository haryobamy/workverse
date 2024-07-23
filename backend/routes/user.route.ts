import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updateUserInfo,
} from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);

userRouter.post('/login', loginUser);

userRouter.get(
  '/logout',
  isAuthenticated,
  //   authorizedRoles("admin"),
  logoutUser
);

//getUserInfo
userRouter.get('/me', isAuthenticated, getUserInfo);

userRouter.put('/update-user-info', isAuthenticated, updateUserInfo);

userRouter.get(
  '/get-users',
  isAuthenticated,

  getAllUsers
);

//deleteUser
userRouter.delete(
  '/delete-user/:id',
  isAuthenticated,

  deleteUser
);

export default userRouter;
