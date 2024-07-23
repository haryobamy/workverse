require('dotenv').config();
import { Response } from 'express';
import { IUser } from '../models/user.model';

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
}

// parse env variable to intergrate with fallback values
export const accessTokenExpires = parseInt(
  process.env.ACCESS_TOKEN_EXPIRES || '300',
  10
);

export const refreshhTokenExpires = parseInt(
  process.env.REFRESH_TOKEN_EXPIRES || '1200',
  10
);

//options forr cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpires * 60 * 60 * 1000),
  maxAge: accessTokenExpires * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshhTokenExpires * 24 * 60 * 60 * 1000),
  maxAge: refreshhTokenExpires * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshhToken = user.SignRefreshToken();

  if (process.env.NODE_ENV === 'production') {
    accessTokenOptions.secure = true;
  }

  res.cookie('access_token', accessToken, accessTokenOptions);
  res.cookie('refresh_token', refreshhToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
