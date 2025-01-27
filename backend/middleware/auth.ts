require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import { CatchAsyncError } from './catchAsynError';
import ErrorHandler from '../utils/ErrorHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel from '../models/user.model';

// authGuard
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(
        new ErrorHandler('Please login to access this resource', 400)
      );
    }
    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    if (!decoded) {
      return new ErrorHandler('access token is not valid', 400);
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return next(
        new ErrorHandler('Please login to access this resource', 400)
      );
    }

    req.user = user;
    next();
  }
);
