require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorHandlerWare } from './middleware/error';
import userRouter from './routes/user.route';
import todoRouter from './routes/todo.route';

//body parser
app.use(express.json({ limit: '50mb' }));

//cookie parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use('/api/v1', userRouter);
app.use('/api/v1/todo', todoRouter);

//testing app route

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: 'Api is working fine',
  });
});

//unknow route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorHandlerWare);
