import { Response } from "express";

export const sendResponse = (
  code: number,
  success: boolean,
  data: any,
  res: Response
) => {
  res.status(code).json({
    success,
    data,
  });
};
